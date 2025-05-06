import { Badge, Button, Modal, Popover, message, Layout, Menu } from 'antd'
import { useNavigate } from 'react-router'
import useAuthStore from '@/store/auth.ts'
import NavIcon from '@/component/icon/NavIcon.tsx'
import { $t } from '@/locales'
import logo from '@/assets/react.svg'
import LangSwitch from '@/features/lang/LangSwitch.tsx'
import { PropsWithChildren, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Content, Header } from 'antd/es/layout/layout'

const NavBar = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { resetAuth } = useAuthStore()

  const handleLogout = () => {
    Modal.confirm({
      title: $t('common.logout'),
      content: $t('common.logoutConfirm'),
      okText: $t('common.yesOrNo.yes'),
      cancelText: $t('common.yesOrNo.no'),
      onOk: () => {
        localStorage.removeItem('user_token')
        resetAuth()
        message.success($t('common.logoutSuccess'))
        navigate('/auth/login')
      },
    })
  }

  const userContent = (
    <div className="p-2">
      <Button type="primary" danger onClick={handleLogout}>
        {$t('common.logout')}
      </Button>
    </div>
  )

  return (
    <Layout className="w-full h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: '#f9f9f9', // 你想要的浅色背景
        }}
      >
        <div onClick={() => setCollapsed(!collapsed)} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 20,
            width: 64,
            height: 64,
            cursor: 'pointer',
        }}>
            {(collapsed? <MenuUnfoldOutlined /> as React.ReactNode :
          <MenuFoldOutlined  /> as React.ReactNode)}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="w-full px-10 py-2 flex flex-row justify-between shadow"
          style={{
            backgroundColor: '#F5F7FA', // 你想要的浅色背景
          }}
        >
          <div className="flex items-center">
            <img src={logo} alt="logo" className="h-8 mr-2" />
            <p className="text-2xl font-bold text-black">{$t('common.title')}</p>
          </div>

          <div className="flex flex-row gap-8 mr-20 pt-2">
            <LangSwitch className="hover:text-blue-500 transition-colors" />
            <Popover
              content={userContent as React.ReactNode}
              placement="bottom"
              trigger="hover"
              arrow={false}
            >
              <div>
                <NavIcon
                  onClick={() => navigate('/user')}
                  icon="mdi:account-circle-outline"
                  iconText={$t('common.userCenter')}
                  className="hover:text-blue-500 transition-colors"
                />
              </div>
            </Popover>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: 'white',
            borderRadius: 5,
          }}
        >
          Content
          {children as React.ReactNode}
        </Content>
      </Layout>
    </Layout>
  )
}

export default NavBar
