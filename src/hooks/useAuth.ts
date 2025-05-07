import { useTokenStore } from '@/store/token'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
  const token = useTokenStore(token => token)
  console.log(token)
  const navigate = useNavigate()
  useEffect(() => {
    if (!token.token) {
      navigate('/auth/login', { replace: true })
    }
  }, [token.token, navigate])
}

export default useAuth
