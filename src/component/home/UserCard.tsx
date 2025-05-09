import { useNavigate } from 'react-router-dom'
import { $t } from '@/locales'

const UserCard = ({ userName }: { userName: string }) => {
  const navigate = useNavigate()
  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-blue-100 flex flex-col gap-5 shadow-md p-7 rounded-2xl transition-all duration-300 hover:shadow-lg">
      <div className="text-3xl font-bold tracking-tight text-gray-800">
        {$t('page.manage.userDetail.welcomeOne')}
        <span className="text-blue-700">{userName}</span>
      </div>
      <div className="text-xl font-light text-gray-600">
        {$t('page.manage.userDetail.welcomeOne')}
      </div>
    </div>
  )
}

export default UserCard
