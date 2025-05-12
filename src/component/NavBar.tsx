import { Button, Layout, Menu, message, Modal, Popover } from 'antd'
import { useNavigate } from 'react-router'
import useAuthStore from '@/store/auth.ts'
import NavIcon from '@/component/icon/NavIcon.tsx'
import { $t } from '@/locales'
import logo from '@/assets/react.svg'
import LangSwitch from '@/features/lang/LangSwitch.tsx'
import { PropsWithChildren, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Icon } from '@iconify/react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Content, Header } from 'antd/es/layout/layout'
import { useTokenStore } from '@/store/token.ts'
import { RoleEnum } from '@/constants/app.ts'

const NavBar = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const { resetAuth } = useAuthStore()
  const role = useTokenStore.getState().role
  const menuItems = [
    {
      key: '1',
      icon: <Icon icon="mdi-light:home" width="24" height="24" />,
      label: <span className="text-lg">{$t('page.manage.menu.home')}</span>,
    },
    {
      key: '2',
      icon: <Icon icon="material-symbols-light:menu" width="24" height="24" />,
      label: <span className="text-lg">{$t('route.(base)_multi-menu')}</span>,
      children: [
        {
          key: '2-1',
          icon: <Icon icon="mynaui:search" width="24" height="24" />,
          label: <span className="text-lg">{$t('route.(base)_multi-menu_first')}</span>,
        },
        {
          key: '2-2',
          icon: <Icon icon="guidance:waiting-room" width="24" height="24" />,
          label: <span className="text-lg">{$t('route.(base)_multi-menu_second')}</span>,
        },
        {
          key: '2-3',
          icon: <Icon icon="carbon:task-approved" width="24" height="24" />,
          label: <span className="text-lg">{$t('route.(base)_multi-menu_third')}</span>,
        },
        {
          key: '2-4',
          icon: <Icon icon="fluent:text-change-reject-20-regular" width="24" height="24" />,
          label: <span className="text-lg">{$t('route.(base)_multi-menu_fourth')}</span>,
        },
      ],
    },
    (role === RoleEnum.Admin || role === RoleEnum.Super) && {
      key: '3',
      icon: <Icon icon="pepicons-pencil:people" width="20" height="20" />,
      label: <span className="text-lg">{$t('page.home.visitCount')}</span>,
    },
    (role === RoleEnum.Admin || role === RoleEnum.Super) && {
      key: '4',
      icon: <Icon icon="akar-icons:statistic-up" width="24" height="24" />,
      label: <span className="text-lg">{$t('page.home.projectCount')}</span>,
    },
    {
      key: '5',
      icon: <Icon icon="clarity:help-info-line" width="24" height="24" />,
      label: <span className="text-lg">{$t('page.about.title')}</span>,
    },
  ]

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
        navigate('/auth/login', { replace: true })
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

  const handleClick = ({ key }: { key: string }) => {
    switch (key) {
      case '1':
        navigate('/')
        break
      case '2-1':
        navigate('/search')
        break
      case '2-2':
        navigate('/tweets?status=Pending')
        break
      case '2-3':
        navigate('/tweets?status=Approved')
        break
      case '2-4':
        navigate('/tweets?status=Rejected')
        break
      case '3':
        navigate('/manage')
        break
      default:
        break
    }
  }

  return (
    <Layout className="w-full flex min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: '#f9f9f9', // 你想要的浅色背景
          minHeight: '100vh',
        }}
        width={collapsed ? 64 : 300}
      >
        <div className="flex justify-center items-center h-16">
          <img src={logo} alt="logo" className="h-10" />
          {collapsed || <p className="ml-2 text-2xl font-bold text-black">{$t('common.title')}</p>}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={handleClick}
          items={menuItems}
        />
      </Sider>
      <Layout className="flex-1 flex flex-col">
        <Header
          className="min-w-full flex flex-row justify-between shadow"
          style={{
            backgroundColor: '#F5F7FA', // 你想要的浅色背景
          }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 20,
              width: 64,
              height: 64,
              cursor: 'pointer',
            }}
          >
            {collapsed
              ? ((<MenuUnfoldOutlined />) as React.ReactNode)
              : ((<MenuFoldOutlined />) as React.ReactNode)}
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
          {children as React.ReactNode}
        </Content>
      </Layout>
    </Layout>
  )
}

export default NavBar
