'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { authClient } from '@/app/_lib/auth-client'

import { Button } from '@/components/ui/button'

export const LogoutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/auth/sign-in')
  }

  return (
    <Button
      type="button"
      variant="ghost"
      className="flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
      onClick={handleSignOut}
    >
      Sair da conta
      <LogOut className="size-4" />
    </Button>
  )
}
