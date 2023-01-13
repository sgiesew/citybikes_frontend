import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  GlobalOutlined,
  EnvironmentOutlined,
  CompassOutlined,
} from '@ant-design/icons'
import logo from '../../assets/logo_large.png'
import caption from '../../assets/caption.png'
import styles from './index.module.css'

const { Content, Sider } = Layout

const LayoutComponent = () => {
  const location = useLocation()
  const items = [
    { 
      label: <Link to='/home'>Stations (Map)</Link>,
      icon: <GlobalOutlined />,
      key: '/home' 
    },
    {
      label: <Link to='/home/stations'>Stations (List)</Link>,
      icon: <EnvironmentOutlined />,
      key: '/home/stations' 
    },
    { 
      label: <Link to='/home/journeys'>Journeys</Link>,
      icon: <CompassOutlined />,
      key: '/home/journeys' 
    }
  ];
  
  return (
    <div>
      <Layout>
        <Layout>
          <Sider width={170}>
            <img className={styles.menu} src={logo} alt='hsl_logo'/>
            <img className={styles.menu} src={caption} alt='hsl_caption'/>
            <Menu style={{paddingTop: 16}}
              mode='inline'
              theme='dark'
              items={items}
              selectedKeys={[location.pathname]}
            />
          </Sider>
          <Layout>
            <Content>
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutComponent
