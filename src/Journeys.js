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
    dataIndex: 'departureStationName',
    key: 'departureStationName'
  },
  {
    title: 'To',
    dataIndex: 'returnStationName',
    key: 'returnStationName'
  },
  {
    title: 'Distance (km)',
    dataIndex: 'distance',
    sorter: true,
    key: 'distance',
    render: element => Number((element / 1000).toFixed(3))
  },
  {
    title: 'Duration (min)',
    dataIndex: 'duration',
    sorter: true,
    key: 'duration',
    render: element => (element / 60).toFixed(2).replace('.', ':')
  },
]

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

function Journeys() {
  const [journeys, setJourneys] = useState([])
  const [fetching, setFetching] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [pageParams, setPageParams] = useState(
    {
      pageLen: 10,
      curPage: 1
    }
  )

  const fetchJourneysPage = (pageParams) => {
    console.log("fetching journeys data")
    setFetching(true)
    getJourneysPage(pageParams.curPage - 1, pageParams.pageLen, pageParams.sortField, pageParams.sortOrder)
      .then(data => {
        console.log(data.content)
        data.content.map((element, index) => {
          element.id = index
          return element
        })
        setJourneys(data.content)
        setTotalPages(data.totalPages)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    console.log("useEffect called")
    fetchJourneysPage(pageParams)
  }, [pageParams])

  const handleTableChange = (pagination, filters, sorter) => {
    
    columns.forEach(column => {
      column.key === sorter.field ? column.sortOrder = sorter.order : column.sortOrder = null
    })
    if (sorter.field !== pageParams.sortField || sorter.order !== pageParams.sortOrder){
      pagination.current = 1
    }
    setPageParams({
      pageLen: pagination.pageSize,
      curPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    })

    console.log(pageParams)
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
      rowKey="id"
      onChange={handleTableChange}
      pagination={{
        current: pageParams.curPage,
        pageSize: pageParams.pageLen,
        total: totalPages * pageParams.pageLen
      }}
    />
    </div>
}

export default Journeys
