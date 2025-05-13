import { useEffect, useState } from 'react'
import { Cascader, Divider, Dropdown, Input, MenuProps, message, Space, Table, Tag } from 'antd'
import { Icon } from '@iconify/react'
import { $t } from '@/locales'
import { sortBy } from '@/constants/app.ts'
import { DiarySearch, SearchReq } from '@/service/api/diary/types.ts'
import Api from '@/service/api'
import { Link } from 'react-router'
import styles from '@/pages/tweets/index.module.scss'

interface Option {
  value: string
  label: string
  children?: Option[]
}

const PAGE_SIZE = 5
const SearchPage = () => {
  const [data, setData] = useState<DiarySearch[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState(sortBy.PublishedAt.toString())
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const columns = [
    {
      title: $t('page.home.dealCount'),
      dataIndex: 'title',
      minWidth: '250px',
      render: (text, record) => (
        <Link className={styles.myLink} to={`/post/${record.id}`}>
          {text}
        </Link>
      ),
      onCell: () => ({
        style: {
          minWidth: '250px',
        },
      }),
    },
    {
      title: $t('system.errorReason'),
      dataIndex: 'tags',
      minWidth: '150px',
      render: tags => {
        return (
          <Space>
            {tags.map(tag => (
              <Tag color="blue" key={tag.id}>
                {tag.name}
              </Tag>
            ))}
          </Space>
        )
      },
      onCell: () => ({
        style: {
          minWidth: '150px',
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
      minWidth: '130px',
      onCell: () => ({
        style: {
          minWidth: '130px',
        },
      }),
    },
    {
      title: $t('page.home.todo'),
      dataIndex: 'likeCount',
      key: 'likeCount',
      minWidth: '80px',
      sorter: (a, b) => {
        return a.likeCount - b.likeCount
      },
      onCell: () => ({
        style: {
          minWidth: '80px',
        },
      }),
    },
    {
      title: $t('page.home.turnover'),
      dataIndex: 'viewCount',
      key: 'viewCount',
      minWidth: '80px',
      sorter: (a, b) => {
        return a.viewCount - b.viewCount
      },
      onCell: () => ({
        style: {
          minWidth: '80px',
        },
      }),
    },
    {
      title: $t('page.home.work'),
      dataIndex: 'commentCount',
      key: 'commentCount',
      minWidth: '80px',
      sorter: (a, b) => {
        return a.commentCount - b.commentCount
      },
      onCell: () => ({
        style: {
          minWidth: '80px',
        },
      }),
    },
    {
      title: $t('page.home.greeting'),
      dataIndex: 'publishedAt',
      key: 'publishedAt',
      render: publishedAt => {
        return new Date(publishedAt).toLocaleString()
      },
      sorter: (a, b) => {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      },
      minWidth: '180px',
      onCell: () => ({
        style: {
          minWidth: '180px',
        },
      }),
    },
    {
      title: $t('page.home.study'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: updatedAt => {
        return new Date(updatedAt).toLocaleString()
      },
      sorter: (a, b) => {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      },
      minWidth: '180px',
      onCell: () => ({
        style: {
          minWidth: '180px',
        },
      }),
    },
  ]

  const options: Option[] = [
    {
      value: sortBy.PublishedAt,
      label: $t('page.home.projectNews.desc3'),
    },
    {
      value: sortBy.LikeCount,
      label: $t('page.home.projectNews.desc4'),
    },
    {
      value: sortBy.CommentCount,
      label: $t('page.home.projectNews.desc5'),
    },
    {
      value: sortBy.ViewCount,
      label: $t('page.home.registerCount'),
    },
    {
      value: sortBy.FavoriteCount,
      label: $t('page.home.rest'),
    },
  ]

  const fetchData = async (page: number, query: string = '') => {
    setLoading(true)
    try {
      const res = await Api.diaryApi.search({
        query,
        sort: keyword,
        page,
        size: PAGE_SIZE,
      } as SearchReq)
      // console.log(res)
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

  const handleSearch = (value: string) => {
    fetchData(1, value)
  }

  const handleCascaderChange = (value: string) => {
    // message.info(`Selected value: ${value}`)
    setKeyword(value)
  }

  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <h1 className="font-bold underline decoration-indigo-500">{$t('page.home.message')}</h1>
      <Input.Search
        loading={loading}
        placeholder={$t('page.home.projectNews.desc1')}
        allowClear
        prefix={<Icon icon="mdi-light:magnify" width="24" height="24" />}
        size="large"
        addonBefore={
          <Cascader
            prefix={<Icon icon="basil:sort-outline" width="24" height="24" />}
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
        scroll={{ x: 'max-content' }}
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
        onChange={pagination => setPage(pagination.current)}
      />
    </div>
  )
}

export default SearchPage
