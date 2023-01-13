import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Table, Spin, Button, Col, Form, Row } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getStationsPage, getStation} from '../../api/client'
import SingleStationView from './SingleStationView'
import styles from './index.module.css'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'City',
    dataIndex: 'city',
    filters: [
      { text: 'Helsinki', value: 'Helsinki' },
      { text: 'Espoo', value: 'Espoo' },
    ],
    filterMultiple: false,
    key: 'city'
  }
]

const Stations = () => {
  
  const [form] = Form.useForm()
  const location = useLocation()
  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [pageParams, setPageParams] = useState(
    {
      pageLen: 10,
      curPage: 1,
      searchTerm: '',
      filterCity: null
    }
  )

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState(null)

  const fetchStationsPage = (pageParams) => {
    setFetching(true)
    getStationsPage(pageParams)
      .then(data => {
        data.content.map((element, index) => {
          element.id = index
          return element
        })
        setStations(data.content)
        setTotalPages(data.totalPages)
        setFetching(false)
      })
  }
  
  useEffect(() => {
    fetchStationsPage(pageParams)
  }, [pageParams])
  
  useEffect(() => {
    columns[1].defaultFilteredValue = null
  }, [location])

  const handleTableChange = (pagination, filters, sorter) => {
    columns[1].defaultFilteredValue = filters.city

    if ((filters.city === null && pageParams.filterCity !== null) || (filters.city !== null && pageParams.filterCity === null)){
      pagination.current = 1
    }

    setPageParams({
      ...pageParams,
      pageLen: pagination.pageSize,
      curPage: pagination.current,
      filterCity: filters.city !== null ? filters.city[0] : null
    })

  }

  const fetchStation = id => {
    getStation(id)
        .then(data => {
            setStation(data);
            setFetchingDetail(false)
        })
  }

  const onFinish = query => {
    setPageParams({
      ...pageParams,
      curPage: 1,
      searchTerm: query.searchTerm,
      filterCity: null
    })
    columns[1].defaultFilteredValue = null
  }

  const onReset = () => {
    setPageParams({
      ...pageParams,
      curPage: 1,
      searchTerm: '',
      filterCity: null
    })
    form.setFieldsValue({
      searchTerm: ''
    })
    columns[1].defaultFilteredValue = null
  }

  const onFinishFailed = errorInfo => {
      //alert(JSON.stringify(errorInfo, null, 2))
  }

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
  }

  const showSearchForm = () => {
    return <Form form={form}
      layout='horizontal'
      initialValues={pageParams}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
    >
      <Row>
        <Col span={8}>
          <Form.Item
            name='searchTerm'
            label=''
            rules={[{required: true, message: 'Please enter a search term'}]}
          >
            <input type='text' style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type='primary' htmlType='submit' className={styles.formbutton}>
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button htmlType='button' onClick={onReset} className={styles.formbutton} style={{backgroundColor: '#fff200'}}>
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }

  
  if (fetching) {
    return <div className={styles.spin}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className={styles.table}>
    <SingleStationView
      station={station}
      showDetailView={showDetailView}
      setShowDetailView={setShowDetailView}
      fetchingDetail={fetchingDetail}
      />
    {showSearchForm()}
    <Table
      dataSource={stations}
      columns={columns}
      style={{cursor: 'pointer'}}
      bordered
      rowKey='id'
      onChange={handleTableChange}
      onRow={(record) => {
        return {
          onClick: () => {
            showDetailViewFor(record.station_id)
          },
        }
      }}
      pagination={{
        current: pageParams.curPage,
        pageSize: pageParams.pageLen,
        total: totalPages * pageParams.pageLen
      }}
    />
  </div>
  
}

export default Stations
