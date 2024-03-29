import React from 'react'
import { useState, useEffect } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {getStations, getStation} from '../../api/client'
import SingleStationView from './SingleStationView'

const StationsMap = () => {

  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState(null)

  const fetchStations = () => {
    setFetching(true)
    getStations()
      .then(data => {
        setStations(data)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    fetchStations()
  }, [])

  const fetchStation = id => {
    getStation(id)
      .then(data => {
        setStation(data)
        setFetchingDetail(false)
      })
  }

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
  }


  if (fetching) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>)
  }
  return <div>
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
            className: 'dot',
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
