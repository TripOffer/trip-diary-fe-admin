import { createContext } from 'react'
import StatusCard from '@/component/common/StatusCard'
import { $t } from '@/locales'

interface StatusType {
  pIcon: string
  aIcon: string
  rIcon: string
  pTitle?: string
  aTitle?: string
  rTitle?: string
  pending?: number
  approved?: number
  rejected?: number
  isLoading: boolean
}

export const UserInfoStatusContext = createContext(false)

const Status = (props: StatusType) => {
  return (
    <UserInfoStatusContext.Provider value={props.isLoading}>
      <div className="w-full row-center flex-row gap-5 py-2">
        <StatusCard
          icon={props.pIcon}
          title={props.pTitle}
          num={props.pending}
          gradient="from-blue-50 to-blue-100"
        />
        <StatusCard
          icon={props.aIcon}
          title={props.aTitle}
          num={props.approved}
          gradient="from-green-50 to-green-100"
        />
        <StatusCard
          icon={props.rIcon}
          title={props.rTitle}
          num={props.rejected}
          gradient="from-purple-50 to-purple-100"
        />
      </div>
    </UserInfoStatusContext.Provider>
  )
}

export default Status
