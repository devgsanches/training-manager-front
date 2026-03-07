import Image from 'next/image'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { authClient } from '@/app/_lib/auth-client'
import { SignInWithGoogle } from '../_components/sign-in-with-google'

async function SignInPage() {
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
    <div className="h-screen flex flex-col bg-[url(/sign-in.png)] bg-position-[45%_-45px] bg-no-repeat bg-cover relative justify-between">
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/10" /> */}
      <div className="relative flex justify-center">
        <Image src="/Fit.ai.svg" alt="Logo" width={85} height={39} className="mt-12" />
      </div>

      <div className="bg-primary h-82.25 rounded-t-[20px] p-5 flex justify-center">
        <div className="flex flex-col justify-between mt-8 items-center">
          <div className="flex flex-col gap-6 items-center">
            <p className="font-semibold text-3xl font-main max-w-80 text-center text-white">O app que vai transformar a forma como você treina.
            </p>

          </div>
          <SignInWithGoogle />
          <p className="font-light text-white text-center text-xs">©2026 Copyright FIT.AI. Todos os direitos reservados</p>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
