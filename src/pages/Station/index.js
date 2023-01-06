import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Spin, Button, Col, Form, Row } from 'antd'
import {
  LoadingOutlined
} from '@ant-design/icons'
import {getStationsPage, getStation} from '../../api/client'
import SingleStationView from './SingleStationView'

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
    console.log("fetching stations data")
    setFetching(true)
    getStationsPage(pageParams)
      .then(data => {
        console.log(data.content)
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
    console.log("useEffect called")
    fetchStationsPage(pageParams)
  }, [pageParams])

  const handleTableChange = (pagination, filters, sorter) => {
    columns[1].defaultFilteredValue = filters.city

    console.log(filters.city)
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
    console.log("fetching station data")
    getStation(id)
        .then(data => {
            console.log(data);
            setStation(data);
            setFetchingDetail(false)
        })
  }

  const onFinish = query => {
    console.log(query)
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
    console.log(id)
  }

  const showSearchForm = () => {
    return <Form form={form}
      layout="horizontal"
      initialValues={pageParams}
      onFinishFailed={onFinishFailed}
      onFinish={onFinish}
      style={{ margin: 8 }}
    >
      <Row>
        <Col span={8}>
          <Form.Item
            name="searchTerm"
            label=""
            rules={[{required: true, message: 'Please enter a search term'}]}
          >
            <input type="text" style={{ width: '100%' }}/>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginLeft: 8, marginTop: 0}}>
              Search
            </Button>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button htmlType="button" onClick={onReset} style={{marginLeft: 8, marginTop: 0}}>
              Reset
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  }

  
  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
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
      bordered
      rowKey="id"
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
