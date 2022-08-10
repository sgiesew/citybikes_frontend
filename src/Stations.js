import React from "react"
import {useState, useEffect} from 'react'
import {Layout, Table, Spin} from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getAllStations} from "./services/client"
import './App.css'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city'
  },
]

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Stations() {
  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)

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


  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={antIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    <Table
      dataSource={stations}
      columns={columns}
      bordered
    />
    </div>
  
}

export default Stations
