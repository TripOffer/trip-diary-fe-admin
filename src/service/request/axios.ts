import axios from 'axios'
import { useTokenStore } from '@/store/token'

const http = axios.create({
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
  timeout: parseInt(import.meta.env.VITE_SERVICE_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  config => {
    const token = useTokenStore.getState().token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (typeof response.data === 'string') {
      try {
        const data = JSON.parse(response.data)
        console.log(`get response data: ${data}`)
        response.data = data
      } catch (error) {
        console.error('Failed to parse response data:', error)
        return response.data
      }
    }

    if (response.data && response.data.code === 403) {
      useTokenStore.getState().clearToken()
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    console.error('Failed to parse response data:', error)
    if (
      error.response &&
      (error.response.status == 403 || error.response.status == 401 || error.response.status == 400)
    ) {
      // console.error('Failed to parse response data:', error)
      return Promise.reject(error.response.data)
    }
  }
)

export default http
