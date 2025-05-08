import { FC, useContext } from 'react'
import { Spin } from 'antd'
import { UserInfoStatusContext } from '@/component/home/Status.tsx'

interface StatusCardProps {
  icon: string
  title: string
  num?: number
  gradient?: string
}

const StatusCard: FC<StatusCardProps> = ({
  icon,
  title,
  num,
  gradient = 'from-gray-100 to-gray-200',
}) => {
  const isLoading = useContext(UserInfoStatusContext)
  return <div className={`flex justify-start gap-4`}></div>
}

export default StatusCard
