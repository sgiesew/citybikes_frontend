import React from 'react'
import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {getStations, getStation} from '../../api/client'
import SingleStationView from './SingleStationView'
import styles from './index.module.css'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const StationsMap = () => {

  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState(null)

  const fetchStations = () => {
    console.log("fetching stations data")
    setFetching(true)
    getStations()
      .then(data => {
        console.log(data)
        setStations(data)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    console.log("useEffect called")
    fetchStations()
  }, [])

  const fetchStation = id => {
    console.log("fetching station data")
    getStation(id)
        .then(data => {
            console.log(data);
            setStation(data);
            setFetchingDetail(false)
        })
  }

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
    console.log(id)
  }


  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360, height: '100vh'}}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 0, minHeight: 360}}>
    <SingleStationView
      station={station}
      showDetailView={showDetailView}
      setShowDetailView={setShowDetailView}
      fetchingDetail={fetchingDetail}
      />
    <MapContainer style={{ width: '100%', height: '100vh' }} center={[60.2203, 24.9337]} zoom={11} >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stations.map( (station, index) =>
        <Marker
          key={index}
          icon={Leaflet.divIcon({
            className: styles.logo,
            html: '🟡',
            popupAnchor: [2, -1]
          })}
          position={[station.ypos, station.xpos]}
          eventHandlers={{
            click: (e) => {
              showDetailViewFor(station.station_id)
            },
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              setTimeout(() => {
                e.target.closePopup();
              }, 1000);
            }
          }}
        >
          <Popup>
            {station.name}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  </div>
  
}

export default StationsMap
