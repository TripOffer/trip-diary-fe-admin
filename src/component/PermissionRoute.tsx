import usePermission from '@/hooks/usePermission.ts'

const PermissionRoute = ({ children }: React.ReactNode) => {
  usePermission()
  return <>{children}</>
}

export default PermissionRoute
