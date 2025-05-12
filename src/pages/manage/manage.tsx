import { $t } from '@/locales'
import { Avatar, Divider, Table, Tag, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { UserBasicInfo } from '@/service/api/manage/types.ts'
import Api from '@/service/api'
import useAuthStore from '@/store/auth.ts'

const PAGE_SIZE = 5
const ManagePage = () => {
  const state = useAuthStore.getState()
  const [myId, myRole] = [state.userId, state.role]
  const [data, setData] = useState<UserBasicInfo[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
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
      render: role => {
        switch (role) {
          case 'Admin':
            if (myRole === 'Super') {
              return (
                <Tooltip title={$t('icon.pin')}>
                  <Tag color="red">{role}</Tag>
                </Tooltip>
              )
            } else {
              return <Tag color="red">{role}</Tag>
            }
          case 'User':
            return (
              <Tooltip title={$t('icon.pin')}>
                <Tag color="green">{role}</Tag>
              </Tooltip>
            )
          case 'Super':
            return <Tag color="orange">{role}</Tag>
          case 'Reviewer':
            if (myRole === 'Admin' || myRole === 'Super') {
              return (
                <Tooltip title={$t('icon.pin')}>
                  <Tag color="purple">{role}</Tag>
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
          case 'Male':
            return <Tag color="blue">{$t('page.manage.user.gender.male')}</Tag>
          case 'Female':
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

  const fetchData = async (page: number) => {
    setLoading(true)
    try {
      const res = await Api.manageApi.getUserList({
        page,
        size: PAGE_SIZE,
      })
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
  }, [page])

  const handleChange = pagination => {
    setPage(pagination.current)
  }

  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <h1 className="font-bold underline decoration-yellow-500">{$t('page.home.visitCount')}</h1>
      <Divider />
      <Table
        rowkey={record => record.id}
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
