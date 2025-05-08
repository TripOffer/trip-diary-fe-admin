import { useTokenStore } from '@/store/token'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoleEnum } from '@/constants/app.ts'
import { message } from 'antd'

const useAuth = () => {
  const token = useTokenStore(token => token)
  console.log(token)
  const navigate = useNavigate()
  useEffect(() => {
    if (token.role === RoleEnum.User) {
      const lang = localStorage.getItem('lang') || 'zh-CN'
      if (lang !== 'zh-CN') {
        message.error('你没有权限访问此页面')
      } else {
        message.error('You do not have permission to access this page')
      }
      navigate('/auth/login', { replace: true })
    }
    if (!token.token) {
      navigate('/auth/login', { replace: true })
    }
  }, [token.token, token.role, navigate])
}

export default useAuth
