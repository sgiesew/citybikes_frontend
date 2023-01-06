import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  EnvironmentOutlined,
  CompassOutlined,
} from '@ant-design/icons'
//import styles from './index.module.scss'

const { Header, Content, Sider } = Layout

const LayoutComponent = () => {
  const location = useLocation()
  const items = [
    { 
      label: <Link to="/home">Stations (map)</Link>,
      icon: <EnvironmentOutlined />,
      key: '/home' 
    },
    {
      label: <Link to="/home/stations">Stations (list)</Link>,
      icon: <EnvironmentOutlined />,
      key: '/home/stations' 
    },
    { 
      label: <Link to="/home/journeys">Journeys</Link>,
      icon: <CompassOutlined />,
      key: '/home/journeys' 
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
              padding: '6px',
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
