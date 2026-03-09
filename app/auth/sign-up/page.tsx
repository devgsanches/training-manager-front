import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { authClient } from '@/app/_lib/auth-client'
import { SignUpWithEmailForm } from '../_components/sign-up-with-email-form'
import { SignInWithGoogle } from '../_components/sign-in-with-google'

async function SignUpPage() {
  const headersList = await headers()
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: headersList.get('cookie') ?? '',
      },
    },
  })

  if (session.data?.user) redirect('/')

  return (
    <div className="h-dvh min-h-dvh flex flex-col justify-end items-center bg-primary bg-[url(/sign-in.png)] bg-position-[45%_-220px] bg-no-repeat bg-cover relative overflow-hidden">
      <div className="absolute flex justify-center top-0">
        <Image src="/logo-fit-ai-white.svg" alt="Logo" width={85} height={39} className="mt-8" />
      </div>

      <div className="bg-primary h-auto rounded-t-[20px] p-5 flex justify-center overflow-y-auto w-full">
        <div className="flex flex-col mt-8 items-center w-full max-w-sm">
          <div className="flex flex-col gap-6 items-center">
            <p className="font-semibold text-3xl font-main max-w-80 text-center text-white">Crie sua conta e comece a treinar.
            </p>
            <SignUpWithEmailForm />
          </div>
          <div className="flex w-full max-w-80 flex-col gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-primary-foreground/30" />
              <span className="text-primary-foreground/70 text-sm">ou</span>
              <div className="flex-1 h-px bg-primary-foreground/30" />
            </div>
            <SignInWithGoogle variant="secondary" />
            <p className="text-center text-sm text-primary-foreground/90">
              Já tem uma conta?{' '}
              <Link href="/auth/sign-in" className="underline hover:text-primary-foreground">
                Entrar
              </Link>
            </p>
          </div>
          <p className="font-light text-white text-center text-xs">©2026 Copyright FIT.AI. Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
