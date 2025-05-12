import { $t } from '@/locales'
import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import { DatePicker, Space, Divider, Spin, Dropdown, Tag, MenuProps } from 'antd'
import dayjs from 'dayjs'
import Api from '@/service/api'
import { SummaryReq } from '@/service/api/stats/types.ts'
import { SummaryStatsType } from '@/constants/app.ts'
import { DownOutlined } from '@ant-design/icons'
import { getSummaryTypes } from '@/utils/common.ts'
import './index.module.scss'

const { RangePicker } = DatePicker

const defaultStart = dayjs().startOf('day').subtract(7, 'day')
const defaultEnd = dayjs().endOf('day')

const StatsPage = () => {
  const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([defaultStart, defaultEnd])
  const [lineData, setLineData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<SummaryStatsType>(SummaryStatsType.DiaryView)
  const items: MenuProps['items'] = getSummaryTypes()

  useEffect(() => {
    fetchData(range[0], range[1])
  }, [range, type])

  const fetchData = async (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    setLoading(true)
    try {
      const res = await Api.statsApi.getSummaryStats({
        type,
        start: start.toISOString(),
        end: end.toISOString(),
      } as SummaryReq)
      console.log(res)
      setLineData(res)
      // setPieData(data.pie)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getLineOption = () => ({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [type],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: lineData.map(d => d.label),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: type,
        type: 'line',
        smooth: true,
        areaStyle: {},
        data: lineData.map(d => d.value),
      },
    ],
  })

  const handleClick = ({ key }: { key: string }) => {
    setType(key as SummaryStatsType)
  }

  return (
    <>
      <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center pt-10 pb-3 scroll-auto">
        <h1 className="font-bold underline decoration-lime-500">{$t('icon.themeSchema')}</h1>
        <Divider />
      </div>
      <Space style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
        <Dropdown menu={{ items, onClick: handleClick }} overlayClassName="dropdown-multi-column">
          <Tag color="blue">
            <Space>
              <span className="font-semibold" style={{ fontSize: '16px' }}>
                {type}
              </span>
              <DownOutlined />
            </Space>
          </Tag>
        </Dropdown>
        <RangePicker
          value={range}
          style={{ width: '400px' }}
          onChange={dates => {
            if (dates) setRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
          }}
        />
      </Space>
      <Spin spinning={loading}>
        <div style={{ display: 'flex', gap: 16, width: '95%' }}>
          <ReactECharts option={getLineOption()} style={{ width: '100%', height: '300px' }} />
        </div>
      </Spin>
    </>
  )
}

export default StatsPage
