import React from "react"
import {useState, useEffect} from 'react'
import {Layout, Table, Spin} from 'antd';
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getAll} from "./services/client"
import './App.css'

const columns = [
  {
    title: 'From',
    dataIndex: 'departure_station_name',
    key: 'departure_station_name'
  },
  {
    title: 'To',
    dataIndex: 'return_station_name',
    key: 'return_station_name'
  },
  {
    title: 'Distance (km)',
    dataIndex: 'distance',
    key: 'distance'
  },
  {
    title: 'Duration (min)',
    dataIndex: 'duration',
    key: 'duration'
  },
]

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function App() {
  const [journeys, setJourneys] = useState([])
  const [fetching, setFetching] = useState(true)

  const fetchJourneys = () => {
    console.log("fetching stations data")
    getAll()
        .then(data => {
            console.log(data);
            data.map(datum => {
              datum.distance = Number((datum.distance / 1000).toFixed(3))
              datum.duration = (datum.duration / 60).toFixed(2).replace('.', ':')
              return datum
            })
            setJourneys(data);
            setFetching(false)
        })
  }
  useEffect(() => {
      console.log("useEffect called")
      fetchJourneys()
  }, [])


  if (fetching) {
    return <Spin indicator={antIcon} />
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    <Table
      dataSource={journeys}
      columns={columns}
      bordered
    />
    </div>
  
}

export default App
