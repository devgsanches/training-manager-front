import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getHomeData } from '@/app/_lib/api/fetch-generated'
import { authClient } from '@/app/_lib/auth-client'
import { getTodayInUserTimezone } from '@/app/_lib/timezone'

import { BottomNav } from './_components/BottomNav'
import { ChatDrawer } from './_components/ChatDrawer'

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

  const today = await getTodayInUserTimezone()
  const homeData = await getHomeData(today)

  const todayWorkoutHref = homeData.status === 200 && homeData.data.activeWorkoutPlanId ? `/workout-plan/${homeData.data.activeWorkoutPlanId}` : null

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {children}
      <BottomNav todayWorkoutHref={todayWorkoutHref} />
      <ChatDrawer />
    </div>
  )
}
