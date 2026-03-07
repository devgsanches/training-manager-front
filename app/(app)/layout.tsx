import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { authClient } from '@/app/_lib/auth-client'

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

  return (
    <div className="flex min-h-screen flex-col pb-20">
      {children}
      <BottomNav />
    </div>
  )
}
