import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getHomeData } from '@/app/_lib/api/fetch-generated'
import { authClient } from '@/app/_lib/auth-client'
import dayjs from 'dayjs'

import { BottomNav } from './_components/BottomNav'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: headersList.get('cookie') ?? '',
      },
    },
  })

  if (!session.data?.user) {
    redirect('/auth/sign-in')
  }

  const today = dayjs().format('YYYY-MM-DD')
  const homeData = await getHomeData(today)

  const todayWorkoutHref =
    homeData.status === 200 &&
    homeData.data.todayWorkoutDay &&
    !homeData.data.todayWorkoutDay.isRest
      ? `/workout-plan/${homeData.data.activeWorkoutPlanId}/days/${homeData.data.todayWorkoutDay.id}`
      : null

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {children}
      <BottomNav todayWorkoutHref={todayWorkoutHref} />
    </div>
  )
}
