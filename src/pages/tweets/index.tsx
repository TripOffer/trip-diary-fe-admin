import { Link, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react'
import Api from '@/service/api'
import { DiaryReview, ReviewListReq } from '@/service/api/Diary/types.ts'
import { Divider, Table, Tag } from 'antd'
import { $t } from '@/locales'
import styles from './index.module.scss'

const PAGE_SIZE = 10
const TweetsPage = () => {
  const [data, setData] = useState<DiaryReview[]>([])
  const [searchParams] = useSearchParams()
  const diaryStatus = searchParams.get('status')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const columns = [
    {
      title: $t('page.home.dealCount'),
      dataIndex: 'title',
      width: '600px',
      render: (text, record) => (
        <Link className={styles.myLink} to={`/post/${record.id}?status=${diaryStatus}`}>
          {text}
        </Link>
      ),
      onCell: () => ({
        style: {
          minWidth: '600px',
        },
      }),
    },
    {
      title: $t('page.home.downloadCount'),
      dataIndex: 'status',
      width: '80px',
      render: status => {
        switch (status) {
          case 'Pending':
            return <Tag color="gold">{status}</Tag>
          case 'Approved':
            return <Tag color="green">{status}</Tag>
          case 'Rejected':
            return <Tag color="red">{status}</Tag>
        }
      },
      onCell: () => ({
        style: {
          minWidth: '80px',
        },
      }),
    },
    {
      title: $t('page.home.entertainment'),
      dataIndex: 'author',
      key: 'author',
      render: author => {
        return author.name
      },
      width: '130px',
      onCell: () => ({
        style: {
          minWidth: '130px',
        },
      }),
    },
    {
      title: $t('page.home.greeting'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: createdAt => {
        return new Date(createdAt).toLocaleString()
      },
      sorter: (a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      },
      width: '200px',
      onCell: () => ({
        style: {
          minWidth: '200px',
        },
      }),
    },
  ]

  const fetchData = async (page: number) => {
    setLoading(true)
    try {
      const res = await Api.diaryApi.reviewList({
        status: diaryStatus,
        page,
        size: PAGE_SIZE,
      } as ReviewListReq)
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
  }, [diaryStatus, page])

  const handleChange = pagination => {
    setPage(pagination.current)
  }

  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <h1 className="font-bold underline decoration-sky-500">{$t('page.home.creativity')}</h1>
      <Divider />
      <Table
        rowKey={record => record.id}
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

export default TweetsPage
