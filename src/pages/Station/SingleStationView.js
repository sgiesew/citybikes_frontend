import React from 'react'
import { Row, Col, Card, Spin, Drawer, Button } from 'antd'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import Leaflet from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Line } from '@ant-design/plots'
import {
  LoadingOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'

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
      bodyStyle={{paddingBottom: 80}}
      >
      <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={spinIcon} />
      </div>
    </Drawer>

  }
  const departuresGraphConfig = {
    data: station.dailyDeparturesFromStation,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
  }
  const returnsGraphConfig = {
    data: station.dailyReturnsToStation,
    padding: 'auto',
    xField: 'date',
    yField: 'count',
  }
  const position = [station.yPos, station.xPos]

  return <Drawer
    title={<>{station.name} ({station.address}, {station.city})</>}
    width={'95%'}
    onClose={onClose}
    visible={showDetailView}
    closeIcon={<EnvironmentOutlined />}
    bodyStyle={{paddingBottom: 80}}
    footer={
      <div
        style={{
            textAlign: 'right',
        }}
      >
        <Button onClick={onClose} style={{marginRight: 8}}>
            Close
        </Button>
      </div>
    }
    >
      <Row>
        <Col span={8}>
          <MapContainer style={{ height: 200, width: 300 }} center={position} zoom={13} >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
          </MapContainer>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={12}>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Total departures"
              >
                {station.numDepartures}
              </Card>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Average length"
              >
                {station.averageDepartureDistance} m
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Total returns"
              >
                {station.numReturns}
              </Card>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Average length"
              >
                {station.averageReturnDistance} m
              </Card>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row>
            <Col span={12}>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Most popular return stations"
              >
                {station.returnedToFromStationRanked.map( (returnStation, index) => <div key={index}>{index+1}) {returnStation}</div>)}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{ marginTop: 0 }}
                type="inner"
                title="Most popular departure stations"
              >
                {station.departedFromToStationRanked.map( (departureStation, index) => <div key={index}>{index+1}) {departureStation}</div>)}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Line {...departuresGraphConfig}
                  title = 'Departures'
                  style={{ height: 200, margin: 8, marginTop: 24 }
            }/>
        </Col>
        <Col span={12}>
          <Line {...returnsGraphConfig}
                    title = 'Returns'
                    style={{ height: 200, margin: 8, marginTop: 24 }
            }/>
        </Col>
      </Row>
  </Drawer>

}

export default SingleStationView