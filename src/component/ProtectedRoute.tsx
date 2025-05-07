import useAuth from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  useAuth()
  return <>{children}</>
}

export default ProtectedRoute
