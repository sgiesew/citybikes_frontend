import React from 'react'
import {useState, useEffect} from 'react'
import {Table, Spin, Button, Col, Form, Row} from 'antd'
import {
  LoadingOutlined,
  RightSquareOutlined
} from '@ant-design/icons'
import {getStationsPage, getStation} from "../../api/client"
import SingleStationView from './SingleStationView'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Stations = () => {
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

  const [form] = Form.useForm()
  const [stations, setStations] = useState([])
  const [fetching, setFetching] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [pageParams, setPageParams] = useState(
    {
      pageLen: 10,
      curPage: 1,
      searchTerm: ''
    }
  )

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState([])

  const fetchStationsPage = (pageParams) => {
    console.log("fetching stations data")
    setFetching(true)
    getStationsPage(pageParams.curPage - 1, pageParams.pageLen, pageParams.searchTerm)
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
    
    setPageParams({
      ...pageParams,
      pageLen: pagination.pageSize,
      curPage: pagination.current
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
      searchTerm: query.searchTerm
    })
  }

  const onReset = () => {
    setPageParams({
      ...pageParams,
      curPage: 1,
      searchTerm: ''
    })
    form.setFieldsValue({
      searchTerm: ''
    })
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


  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    {SingleStationView(station, showDetailView, setShowDetailView, fetchingDetail)}
    <Form form={form}
            layout="vertical"
            initialValues={pageParams}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            style={{ margin: 24, marginTop: 24 }}
        >
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        name="searchTerm"
                        label=""
                        rules={[{required: true, message: 'Please enter a search term'}]}
                    >
                      <input type="text" />
                    </Form.Item>
                </Col>
                <Col span={6}>
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
    <Table
      dataSource={stations}
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

export default Stations
