import { Layout, Menu } from 'antd'
import React from 'react'
import {
  EnvironmentOutlined,
  CompassOutlined,
} from '@ant-design/icons'
import { Outlet, useLocation, Link } from 'react-router-dom'

const { Header, Content, Sider } = Layout

function MainMenu () {
  const location = useLocation()


  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              theme="dark"
              selectedKeys={[location.pathname]}
              style={{
                height: '100%',
                borderRight: 0,
              }}
            >
              <Menu.Item key={'/home'} icon={<CompassOutlined />}>
                <Link to="/home">Journeys</Link>
              </Menu.Item>
              <Menu.Item key={'/home/stations'} icon={<EnvironmentOutlined />}>
                <Link to="/home/stations">Stations</Link>
              </Menu.Item>
            </Menu>
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

export default MainMenu
