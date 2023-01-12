import React from 'react'
import { Row, Col, Card, Spin, Drawer, Button } from 'antd'
import { Line } from '@ant-design/plots'
import {
  LoadingOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './index.module.css'

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/'
const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const SingleStationView = ({station, showDetailView, setShowDetailView, fetchingDetail}) => {
  const onClose = () => {
    setShowDetailView(false)
  }

  if (!station){
    return
  }

  if (fetchingDetail){
    return <Drawer
      width={'95%'}
      onClose={onClose}
      visible={showDetailView}
      >
      <div className={styles.spin}>
        <Spin indicator={spinIcon} />
      </div>
    </Drawer>

  }
  const departuresGraphConfig = {
    data: station.dailyDeparturesFromStation,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
    xAxis: {
      type: 'timeCat',
      tickInterval: 15,
    }
  }
  const returnsGraphConfig = {
    data: station.dailyReturnsToStation,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
    xAxis: {
      type: 'timeCat',
      tickInterval: 15,
    }
  }
  const position = [station.yPos, station.xPos]

  return <Drawer
    title={<div>{station.name} ({station.address}, {station.city})</div>}
    width={'95%'}
    onClose={onClose}
    visible={showDetailView}
    closeIcon={<EnvironmentOutlined />}
    footer={
      <div
        style={{textAlign: 'right'}}
      >
        <Button onClick={onClose} className={styles.exitbutton} style={{backgroundColor: '#fff200'}}>
          Close
        </Button>
      </div>
    }
    >
      <Row>
        <Col span={6}>
          <div className={styles.mapdetail}>
            <MapContainer style={{ height: '20vw', width: '100%' }} center={position} zoom={13} >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}></Marker>
            </MapContainer>
          </div>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={12}>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title="Total departures"
              >
                {station.numDepartures}
              </Card>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title={<div>Average journey<br></br>from here</div>}
              >
                {station.averageDepartureDistance} m
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title="Total returns"
              >
                {station.numReturns}
              </Card>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title={<div>Average journey<br></br>to here</div>}
              >
                {station.averageReturnDistance} m
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Row>
            <Col span={12}>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title={<div>Most popular<br></br>return stations</div>}
              >
                {station.returnedToFromStationRanked.map( (returnStation, index) => <div key={index}>{index+1}) {returnStation}</div>)}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ margin: 2 }}
                type="inner"
                title={<div>Most popular<br></br>departure stations</div>}
              >
                {station.departedFromToStationRanked.map( (departureStation, index) => <div key={index}>{index+1}) {departureStation}</div>)}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card
            style={{ margin: 2 }}
            type="inner"
            title="Departures per day"
          >
            <Line {...departuresGraphConfig}
                    title = 'Departures'
                    style={{ height: 200, margin: 8, marginTop: 24 }
              }/>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            style={{ margin: 2 }}
            type="inner"
            title="Returns per day"
          >
            <Line {...returnsGraphConfig}
                      title = 'Returns'
                      style={{ height: 200, margin: 8, marginTop: 24 }
                }/>
          </Card>
        </Col>
      </Row>
    </Drawer>

}

export default SingleStationView