import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Table, Spin } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getJourneysPage} from '../../api/client'
import styles from './index.module.css'

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

  const location = useLocation()
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
    setFetching(true)
    getJourneysPage(pageParams)
      .then(data => {
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
    fetchJourneysPage(pageParams)
  }, [pageParams])

  useEffect(() => {
    columns[0].defaultFilteredValue = null
    columns[1].defaultFilteredValue = null
    columns[2].sortOrder = null
    columns[3].sortOrder = null
  }, [location])


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

  }

  if (fetching) {
    return <div className={styles.spin}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className={styles.table}>
    <Table
      dataSource={journeys}
      columns={columns}
      bordered
      rowKey='id'
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
