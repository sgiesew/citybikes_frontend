import React from 'react'
import {useState, useEffect} from 'react'
import {Table, Spin} from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getJourneysPage} from "./services/client"
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

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Journeys() {
  const [journeys, setJourneys] = useState([])
  const [fetching, setFetching] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [pageLen, setPageLen] = useState(10)
  const [curPage, setCurPage] = useState(1)

  const fetchJourneysPage = (pageNr, pageLen) => {
    console.log("fetching journeys data")
    setFetching(true)
    getJourneysPage(pageNr, pageLen)
        .then(data => {
            console.log(data);
            data.content.map(datum => {
              datum.distance = Number((datum.distance / 1000).toFixed(3))
              datum.duration = (datum.duration / 60).toFixed(2).replace('.', ':')
              return datum
            })
            setJourneys(data.content);
            setTotalPages(data.totalPages)
            setFetching(false)
        })
  }
  
  useEffect(() => {
      console.log("useEffect called")
      fetchJourneysPage(curPage - 1, pageLen)
  }, [pageLen, curPage])

  const handleTableChange = (pagination, filters, sorter) => {
    const current = pagination.current
    const len = pagination.pageSize
    console.log(current, "/", len)
    setPageLen(len)
    setCurPage(current)
    //fetchJourneysPage(current - 1, len)
  }

  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    <Table
      dataSource={journeys}
      columns={columns}
      bordered
      rowKey="distance"
      onChange={handleTableChange}
      pagination={{
        current: curPage,
        pageSize: pageLen,
        total: totalPages * pageLen
     }}
    />
    </div>
}

export default Journeys
