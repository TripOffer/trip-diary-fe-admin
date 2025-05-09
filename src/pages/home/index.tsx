import { useRefetchStore } from '@/store/refetch.ts'
import ApiKeys from '@/constants/apiKeys.ts'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import useAuth from '@/hooks/useAuth.ts'
import { useTokenStore } from '@/store/token.ts'
import { RoleEnum } from '@/constants/app.ts'
import Api from '@/service/api'
import UserCard from '@/component/home/UserCard.tsx'
import Status from '@/component/home/Status.tsx'

const HomePage = () => {
  const { setRefetchStatus } = useRefetchStore()
  const { user, role } = useTokenStore()
  const name = JSON.parse(user!).name
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ApiKeys.stats],
    queryFn: () =>
      role === RoleEnum.Reviewer ? Api.statsApi.getReviewerStats() : Api.statsApi.getAdminStats(),
  })
  console.log(data)
  useAuth()
  useEffect(() => {
    setRefetchStatus(refetch)
  }, [refetch, setRefetchStatus])
  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <UserCard userName={name} />
      <Status
        {...{
          pending: data?.diary.pending,
          approved: data?.diary.approved,
          rejected: data?.diary.rejected,
          isLoading,
        }}
      />
    </div>
  )
}

export default HomePage
