import { useRefetchStore } from '@/store/refetch.ts'
import ApiKeys from '@/constants/apiKeys.ts'
import Api from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth.ts'
import UserCard from '@/component/home/UserCard.tsx'
import Status from '@/component/home/Status.tsx'

const HomePage = () => {
  const { setRefetchStatus } = useRefetchStore()
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ApiKeys.userInfo],
    queryFn: () => Api.userApi.getUserInfo(),
  })
  useAuth()
  useEffect(() => {
    setRefetchStatus(refetch)
  }, [refetch, setRefetchStatus])
  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto"></div>
  )
}

export default HomePage
