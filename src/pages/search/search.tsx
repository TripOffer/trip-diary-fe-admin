import { useEffect, useState } from 'react'
import { Cascader, Dropdown, Input, MenuProps, message, Space } from 'antd'
import { Icon } from '@iconify/react'
import { $t } from '@/locales'
import { sortBy } from '@/constants/app.ts'
import { DiarySearch, SearchReq } from '@/service/api/Diary/types.ts'
import Api from '@/service/api'

interface Option {
  value: string
  label: string
  children?: Option[]
}

const SearchPage = () => {
  const [data, setData] = useState<DiarySearch[]>([])
  const [loading, setLoading] = useState(false)
  const [keyword, setKeyword] = useState(sortBy.PublishedAt)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

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

  const fetchData = async (page: number) => {
    setLoading(true)
    try {
      const res = await Api.diaryApi.search({
        sort: keyword,
        page,
        size: 10,
      } as SearchReq)
      console.log(res)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])

  const handleSearch = (value: string) => {}

  const handleCascaderChange = (value: string) => {
    message.info(`Selected value: ${value}`)
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
            prefix={<Icon icon="stash:filter" width="24" height="24" />}
            options={options}
            onChange={handleCascaderChange}
            defaultValue={[keyword]}
            style={{ width: 150 }}
          />
        }
        enterButton={$t('page.home.projectNews.desc2')}
        onSearch={value => {
          setLoading(true)
          setTimeout(() => {
            setLoading(false)
            message.success(`Searching for ${value}`)
          }, 1000)
        }}
      />
    </div>
  )
}

export default SearchPage
