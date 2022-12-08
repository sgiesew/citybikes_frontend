import React from 'react'
import {Card, Spin, Drawer, Button} from 'antd'
import {
  LoadingOutlined,
  EnvironmentOutlined
} from '@ant-design/icons'

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const SingleStationView = (station, showDetailView, setShowDetailView, fetchingDetail) => {

  if (fetchingDetail){
    return <Drawer
      width={640}
      onClose={setShowDetailView(false)}
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
    onClose={setShowDetailView(false)}
    visible={showDetailView}
    closeIcon={<EnvironmentOutlined />}
    bodyStyle={{paddingBottom: 80}}
    footer={
      <div
        style={{
            textAlign: 'right',
        }}
      >
        <Button onClick={setShowDetailView(false)} style={{marginRight: 8}}>
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

export default SingleStationView