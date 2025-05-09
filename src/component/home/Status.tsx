import { createContext } from 'react'
import StatusCard from '@/component/common/StatusCard'
import waiting from '@/assets/waiting.svg'
import approved from '@/assets/approved.svg'
import rejected from '@/assets/rejected.svg'
import { $t } from '@/locales'

interface StatusType {
  waiting?: number
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
          icon={waiting}
          title={$t('page.manage.common.status.waiting')}
          num={props.waiting}
          gradient="from-blue-50 to-blue-100"
        />
        <StatusCard
          icon={approved}
          title={$t('page.manage.common.status.approved')}
          num={props.approved}
          gradient="from-green-50 to-green-100"
        />
        <StatusCard
          icon={rejected}
          title={$t('page.manage.common.status.rejected')}
          num={props.rejected}
          gradient="from-purple-50 to-purple-100"
        />
      </div>
    </UserInfoStatusContext.Provider>
  )
}

export default Status
