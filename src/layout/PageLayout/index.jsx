import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../../context'

import { Layout, Menu, Dropdown } from 'antd'
import {
  HomeOutlined,
  PlusOutlined,
  CarryOutOutlined,
  FileDoneOutlined,
  RocketOutlined,
  CustomerServiceOutlined,
  DownOutlined,
  UpOutlined,
  UserOutlined,
  BulbOutlined,
  BugOutlined,
  WifiOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloudUploadOutlined
} from '@ant-design/icons'

import { MenuContainer, UserContainer } from './styles'
import logo from '../../assets/logo-sm.svg'
import userImg from '../../assets/user.jpg'

const { Header, Content, Sider } = Layout

const PageLayout = ({ isVisible, children }) => {
  const { signOut } = useAuth()

  const [collapsed, setCollapsed] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  function toggle() {
    if (collapsed) {
      setCollapsed(false)
      return;
    }

    setCollapsed(true)
  }

  const current = new Date()

  const menu = (
    <Menu>
      <Menu.Item>
        <a href='#'>
          <UserOutlined style={{ marginRight: '10.12px' }} />
          Minha conta
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href='#'>
          <BulbOutlined style={{ marginRight: '10.12px' }} />
          Usar no modo escuro
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href='#'>
          <BugOutlined style={{ marginRight: '10.12px' }} />
          Informar problema
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href='#'>
          <WifiOutlined style={{ marginRight: '10.12px' }} />
          Teste de conexão
        </a>
      </Menu.Item>
      <Menu.Item
        onClick={signOut}
        style={{ color: '#1890FF', marginRight: '10.12px' }}
      >
        <Link to='/'>
          Sair
        </Link>
      </Menu.Item>
    </Menu>
  )

  if (!isVisible) {
    return <>{children}</>
  } else {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
          <img src={logo} alt='' style={{ paddingTop: 12, paddingLeft: 24, paddingBottom: 7 }} />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
            <Menu.Item key='1' icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key='2' icon={<PlusOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key='3' icon={<CarryOutOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key='4' icon={<FileDoneOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key='5' icon={<RocketOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key='6' icon={<CustomerServiceOutlined />}>
              Home
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>
            <MenuContainer>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                onClick: toggle,
                className: 'collapse'
              })}
              <span><CloudUploadOutlined className='savedIcon' /> Salvo automaticamente às {current.toLocaleTimeString()}</span>
              <UserContainer>
                <Dropdown
                  overlay={menu}
                  onVisibleChange={() =>
                    isClicked ? setIsClicked(false) : setIsClicked(true)}
                >
                  <span>
                    <img
                      src={userImg}
                      alt='imagem de usuário'
                    />
                    Usuário
                    {isClicked ? <UpOutlined /> : <DownOutlined />}
                  </span>
                </Dropdown>
              </UserContainer>
            </MenuContainer>
          </Header>
          <Content style={{ padding: 16 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}
export default PageLayout
