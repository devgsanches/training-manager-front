import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { authClient } from '@/app/_lib/auth-client'

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

  return <>{children}</>
}
