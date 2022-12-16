import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  EnvironmentOutlined,
  CompassOutlined,
} from '@ant-design/icons'

const { Content, Sider } = Layout

function LayoutComponent () {
  const location = useLocation()
  const items = [
    { 
      label: 'Helsinki City Bikes', 
      key: '/title'
    },
    { 
      label: <Link to="/home">Journeys</Link>,
      icon: <CompassOutlined />,
      key: '/home' 
    },
    {
      label: <Link to="/home/stations">Stations</Link>,
      icon: <EnvironmentOutlined />,
      key: '/home/stations' 
    }
  ];
  
  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              items={items}
              selectedKeys={[location.pathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            />
          </Sider>
          <Layout
            style={{
              padding: '24px',
              overflow: 'auto',
            }}
          >
            <Content className="site-layout-background">
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
