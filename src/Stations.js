import React from 'react'
import {useState, useEffect} from 'react'

import {Layout, Table, Spin, Drawer, Button} from 'antd'
import {
  LoadingOutlined,
  RightSquareOutlined
} from '@ant-design/icons'
import './App.css'

import {getAllStations, getStation} from "./services/client"

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Stations() {
  const columns = [
    {
      title: 'Station name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city'
    },
    { 
      key: 'action', 
      title: 'More...', 
      render: (record) => { 
        return ( 
          <> 
            <RightSquareOutlined
              onClick={() => showDetailViewFor(record.station_id)} 
            /> 
          </> 
        )
      },
    }
    ]

  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)
  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState([])

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
    console.log(id)
  }

  const fetchStations = () => {
    console.log("fetching stations data")
    getAllStations()
        .then(data => {
            console.log(data);
            setStations(data);
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
  const onDetailViewClose = () => setShowDetailView(false)

  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={antIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    <Drawer
      title={station.name}
      width={720}
      onClose={onDetailViewClose}
      visible={showDetailView}
      bodyStyle={{paddingBottom: 80}}
      footer={
        <div
          style={{
              textAlign: 'right',
          }}
        >
          <Button onClick={onDetailViewClose} style={{marginRight: 8}}>
              Close
          </Button>
        </div>
      }
      >
        Station detail: 
    </Drawer>
    <Table
      dataSource={stations}
      columns={columns}
      bordered
    />
  </div>
  
}

export default Stations
