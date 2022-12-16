import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Spin } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getJourneysPage} from '../../api/client'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const columns = [
  {
    title: 'From',
    dataIndex: 'departureStationName',
    filters: [
      { text: 'Metro station', value: 'metro' },
      { text: 'Train station', value: 'train' },
    ],
    filterMultiple: false,
    key: 'departureStationName'
  },
  {
    title: 'To',
    dataIndex: 'returnStationName',
    filters: [
      { text: 'Metro station', value: 'metro' },
      { text: 'Train station', value: 'train' },
    ],
    filterMultiple: false,
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

const Journeys = () => {

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
    getJourneysPage(pageParams)
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
    console.log("pageParams: ", pageParams)
    fetchJourneysPage(pageParams)
  }, [pageParams])

  const handleTableChange = (pagination, filters, sorter) => {
    
    columns.forEach(column => {
      column.key === sorter.field ? column.sortOrder = sorter.order : column.sortOrder = null
    })
    columns[0].defaultFilteredValue = filters.departureStationName
    columns[1].defaultFilteredValue = filters.returnStationName

    if (sorter.field !== pageParams.sortField || sorter.order !== pageParams.sortOrder){
      pagination.current = 1
    }

    setPageParams({
      pageLen: pagination.pageSize,
      curPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      filterDeparture: filters.departureStationName !== null ? filters.departureStationName[0] : null,
      filterReturn: filters.returnStationName !== null ? filters.returnStationName[0] : null
    })

    console.log("filters: ", filters)
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
