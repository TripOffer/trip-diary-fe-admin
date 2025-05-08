import { createContext } from 'react'
import StatusCard from '@/component/common/StatusCard'

interface StatusType {
  waiting?: number
  approved?: number
  rejected?: number
  isLoading: boolean
}

export const UserInfoStatusContext = createContext(false)

const Status = (props: StatusType) => {
  return (

  )
}

export default Status