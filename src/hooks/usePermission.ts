import { useTokenStore } from '@/store/token.ts'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { RoleEnum } from '@/constants/app.ts'
import { message } from 'antd'
import { $t } from '@/locales'

const usePermission = () => {
  const { role } = useTokenStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const from = location.state?.from?.pathname || '/'
    if (role === RoleEnum.Reviewer || role === RoleEnum.User) {
      message.warning($t('request.noPermission'))
      navigate(from, { replace: true })
    }
  }, [role, navigate, location])
}

export default usePermission
