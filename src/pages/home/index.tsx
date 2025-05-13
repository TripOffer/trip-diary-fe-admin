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
import pending from '@/assets/pending.svg'
import approved from '@/assets/approved.svg'
import rejected from '@/assets/rejected.svg'
import people from '@/assets/people.svg'
import comments from '@/assets/comments.svg'
import tweets from '@/assets/tweets.svg'
import { $t } from '@/locales'

const HomePage = () => {
  const { setRefetchStatus } = useRefetchStore()
  const { user, role } = useTokenStore()
  let name = ''
  try {
    name = user
      ? JSON.parse(user).name || JSON.parse(user).username || JSON.parse(user).username || ''
      : ''
  } catch {
    name = ''
  }
  const { data, isLoading, refetch } = useQuery({
    queryKey: [ApiKeys.stats],
    queryFn: () =>
      role === RoleEnum.Reviewer ? Api.statsApi.getReviewerStats() : Api.statsApi.getAdminStats(),
  })
  useAuth()
  useEffect(() => {
    setRefetchStatus(refetch)
  }, [refetch, setRefetchStatus])
  return (
    <div className="w-[90%] m-auto flex flex-col gap-6 justify-start items-center p-10 scroll-auto">
      <UserCard userName={name} />
      <Status
        {...{
          pIcon: pending,
          aIcon: approved,
          rIcon: rejected,
          pTitle: $t('page.manage.common.status.pending'),
          aTitle: $t('page.manage.common.status.approved'),
          rTitle: $t('page.manage.common.status.rejected'),
          pending: data?.diary.pending,
          approved: data?.diary.approved,
          rejected: data?.diary.rejected,
          isLoading,
        }}
      />
      <Status
        {...{
          pIcon: people,
          aIcon: comments,
          rIcon: tweets,
          pTitle: $t('page.manage.common.total.users'),
          aTitle: $t('page.manage.common.total.comments'),
          rTitle: $t('page.manage.common.total.tweets'),
          pending: data?.diary?.total ?? -1,
          approved: data?.comment?.total ?? -1,
          rejected: data?.diary?.total ?? -1,
          isLoading,
        }}
      />
    </div>
  )
}

export default HomePage
