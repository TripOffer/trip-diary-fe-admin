import { $t } from '@/locales'
import {
  Avatar,
  Cascader,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  message,
  Space,
  Table,
  Tag,
  Tooltip,
} from 'antd'
import { useEffect, useState } from 'react'
import { ChangeRoleReq, UserBasicInfo } from '@/service/api/manage/types.ts'
import Api from '@/service/api'
import { useTokenStore } from '@/store/token.ts'
import { DownOutlined } from '@ant-design/icons'
import { Icon } from '@iconify/react'
import { RoleEnum } from '@/constants/app.ts'

const PAGE_SIZE = 5
const ManagePage = () => {
  const [data, setData] = useState<UserBasicInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [searchLoading, setSearchLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [changeId, setChangeId] = useState<number>(0)
  const [keyword, setKeyword] = useState<string>($t('route.document'))
  const [key, setKey] = useState<string>('')
  const { role } = useTokenStore()
  const myRole = role
  const options = [
    {
      value: 'id',
      label: 'ID',
    },
    {
      value: 'name',
      label: $t('page.manage.user.userName'),
    },
    {
      value: 'email',
      label: $t('page.manage.user.userEmail'),
    },
    {
      value: 'role',
      label: $t('page.manage.user.userRole'),
    },
  ]
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          <Tag color="green">User</Tag>
        </span>
      ),
    },
    {
      key: '2',
      label: (
        <span>
          <Tag color="purple">Reviewer</Tag>
        </span>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <Tag color="red">Admin</Tag>
        </span>
      ),
      disabled: myRole !== 'Super',
    },
  ]
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '50px',
      onCell: () => ({
        style: {
          minWidth: '50px',
        },
      }),
    },
    {
      title: $t('icon.collapse'),
      dataIndex: 'name',
      width: '300px',
      render: (text, record) => (
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Avatar src={record.avatar} />
            <span className="font-medium">{text}</span>
          </div>
        </div>
      ),
      onCell: () => ({
        style: {
          minWidth: '300px',
        },
      }),
    },
    {
      title: $t('icon.expand'),
      dataIndex: 'email',
      width: '200px',
      onCell: () => ({
        style: {
          minWidth: '200px',
        },
      }),
    },
    {
      title: $t('icon.fullscreen'),
      dataIndex: 'role',
      width: '100px',
      onCell: () => ({
        style: {
          minWidth: '100px',
        },
      }),
      render: (role, record) => {
        switch (role) {
          case 'Admin':
            if (myRole === 'Super') {
              return (
                <Tooltip title={$t('icon.pin')}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: ({ key }: { key: string }) => handleClick(key, record.id),
                    }}
                  >
                    <Tag color="red">
                      <Space>
                        {role}
                        <DownOutlined />
                      </Space>
                    </Tag>
                  </Dropdown>
                </Tooltip>
              )
            } else {
              return <Tag color="red">{role}</Tag>
            }
          case 'User':
            return (
              <Tooltip title={$t('icon.pin')} trigger="hover">
                <Dropdown
                  menu={{
                    items,
                    onClick: ({ key }: { key: string }) => handleClick(key, record.id),
                  }}
                >
                  <Tag color="green">
                    <Space>
                      {role}
                      <DownOutlined />
                    </Space>
                  </Tag>
                </Dropdown>
              </Tooltip>
            )
          case 'Super':
            return <Tag color="orange">{role}</Tag>
          case 'Reviewer':
            if (myRole === 'Admin' || myRole === 'Super') {
              return (
                <Tooltip title={$t('icon.pin')}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: ({ key }: { key: string }) => handleClick(key, record.id),
                    }}
                  >
                    <Tag color="purple">
                      <Space>
                        {role}
                        <DownOutlined />
                      </Space>
                    </Tag>
                  </Dropdown>
                </Tooltip>
              )
            } else {
              return <Tag color="purple">{role}</Tag>
            }
        }
      },
    },
    {
      title: $t('icon.fullscreenExit'),
      dataIndex: 'gender',
      width: '100px',
      onCell: () => ({
        style: {
          minWidth: '100px',
        },
      }),
      render: gender => {
        switch (gender) {
          case 'male':
            return <Tag color="blue">{$t('page.manage.user.gender.male')}</Tag>
          case 'female':
            return <Tag color="pink">{$t('page.manage.user.gender.female')}</Tag>
          default:
            return <Tag color="gray">{$t('page.manage.user.gender.other')}</Tag>
        }
      },
    },
    {
      title: $t('icon.lang'),
      dataIndex: 'createdAt',
      width: '200px',
      render: createdAt => {
        return new Date(createdAt).toLocaleString()
      },
      sorter: (a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      },
    },
  ]

  const handleClick = async (key: string, id: number) => {
    let role = ''
    switch (key) {
      case '1':
        role = 'User'
        break
      case '2':
        role = 'Reviewer'
        break
      case '3':
        role = 'Admin'
        break
    }
    try {
      await Api.manageApi.changeRole(String(id), {
        role,
      } as ChangeRoleReq)
      message.success($t('common.modifySuccess'))
    } catch (error) {
      message.error($t('common.errorHint'))
      console.error('Error fetching data:', error)
    } finally {
      setChangeId(changeId + 1)
    }
  }

  const fetchData = async (page: number, value = '') => {
    setLoading(true)
    try {
      const params = {
        ...(value ? { [key]: value } : {}),
        page,
        size: PAGE_SIZE,
      }
      const res = await Api.manageApi.getUserList(params)
      setData(res.list)
      setTotal(res.total)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page, changeId])

  const handleChange = pagination => {
    setPage(pagination.current)
  }

  const handleCascaderChange = (value: string, selectedOptions: any) => {
    setKeyword(value)
    setKey(selectedOptions[0].value)
  }

  const handleSearch = (value: string) => {
    fetchData(1, value)
  }

  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <h1 className="font-bold underline decoration-yellow-500">{$t('page.home.visitCount')}</h1>
      <Input.Search
        loading={searchLoading}
        placeholder={$t('page.home.projectNews.desc1')}
        allowClear
        prefix={<Icon icon="mdi-light:magnify" width="24" height="24" />}
        size="large"
        addonBefore={
          <Cascader
            prefix={<Icon icon="stash:filter-solid" width="24" height="24" />}
            options={options}
            onChange={handleCascaderChange}
            defaultValue={[keyword]}
            style={{ width: 150 }}
          />
        }
        enterButton={$t('page.home.projectNews.desc2')}
        onSearch={handleSearch}
      />
      <Divider />
      <Table
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
        }}
        onChange={handleChange}
      />
    </div>
  )
}

export default ManagePage
