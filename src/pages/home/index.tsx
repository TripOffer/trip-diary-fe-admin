import { useRefetchStore } from '@/store/refetch.ts'
import ApiKeys from '@/constants/apiKeys.ts'
import Api from '@/service/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const HomePage = () => {
  const { setRefetchStatus } = useRefetchStore()
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ApiKeys.userInfo],
    queryFn: () => Api.userApi.getUserInfo(),
  })
}

export default HomePage
