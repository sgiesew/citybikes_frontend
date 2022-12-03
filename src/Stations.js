import React from 'react'
import {useState, useEffect} from 'react'

import {Card, Table, Spin, Drawer, Button} from 'antd'
import {
  LoadingOutlined,
  RightSquareOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'
import './App.css'

import {getStationsPage, getStation} from "./services/client"

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

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
  const [totalPages, setTotalPages] = useState(1)
  const [pageParams, setPageParams] = useState(
    {
      pageLen: 10,
      curPage: 1
    }
  )

  const [fetchingDetail, setFetchingDetail] = useState(false)
  const [showDetailView, setShowDetailView] = useState(false)
  const [station, setStation] = useState([])

  const fetchStationsPage = (pageParams) => {
    console.log("fetching stations data")
    setFetching(true)
    getStationsPage(pageParams.curPage - 1, pageParams.pageLen, pageParams.sortField, pageParams.sortOrder)
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
      pageLen: pagination.pageSize,
      curPage: pagination.current
    })

    console.log(pageParams)
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

  const showDetailViewFor = id => {
    fetchStation(id)
    setStation([])
    setShowDetailView(true)
    setFetchingDetail(true)
    console.log(id)
  }

  const renderDetailView = () => {
    if (fetchingDetail){
      return <Drawer
        width={640}
        onClose={onDetailViewClose}
        visible={showDetailView}
        bodyStyle={{paddingBottom: 80}}
        >
        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
          <Spin indicator={spinIcon} />
        </div>
      </Drawer>

    }
    return <Drawer
      title={station.name}
      width={640}
      onClose={onDetailViewClose}
      visible={showDetailView}
      closeIcon={<EnvironmentOutlined />}
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
        <Card type="inner" title="Address">
          {station.address}, {station.city}
        </Card>
        <Card
          style={{ marginTop: 24 }}
          type="inner"
          title="Departures from this station"
        >
          {station.num_departures}
        </Card>
        <Card
          style={{ marginTop: 12 }}
          type="inner"
          title="Returns to this station"
        >
          {station.num_returns}
        </Card>
    </Drawer>
  }

  const onDetailViewClose = () => setShowDetailView(false)

  if (fetching) {
    return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
        <Spin indicator={spinIcon} />
      </div>
  }
  return <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
    {renderDetailView()}
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
