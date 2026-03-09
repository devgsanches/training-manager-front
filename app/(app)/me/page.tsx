import Image from 'next/image'
import { headers } from 'next/headers'

import { getAuthenticatedUserTrainData } from '@/app/_lib/api/fetch-generated'
import { authClient } from '@/app/_lib/auth-client'

import { Logo } from '../_components/Logo'
import { LogoutButton } from '../_components/LogoutButton'
import { ProfileStatsCards } from '../_components/ProfileStatsCards'

const MePage = async () => {
  const headersList = await headers()
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: headersList.get('cookie') ?? '',
      },
    },
  })

  const userImage = session.data?.user?.image ?? null
  const userName = session.data?.user?.name ?? 'Usuário'

  const trainDataResponse = await getAuthenticatedUserTrainData()

  if (trainDataResponse.status !== 200) {
    return (
      <main className="flex flex-1 flex-col gap-6 p-5">
        <header className="p-4">
          <Logo black />
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted px-6 py-12 text-center">
          <p className="font-heading text-base font-semibold text-foreground">
            Não foi possível carregar seus dados.
          </p>
          <p className="text-sm text-muted-foreground">
            Tente novamente mais tarde.
          </p>
        </div>
      </main>
    )
  }

  const { data } = trainDataResponse
  const weightInGrams = data.weightInGrams != null ? Number(data.weightInGrams) : null
  const heightInCentimeters = data.heightInCentimeters != null ? Number(data.heightInCentimeters) : null
  const bodyFatPercentage = data.bodyFatPercentage != null ? Number(data.bodyFatPercentage) : null
  const age = data.age != null ? Number(data.age) : null

  return (
    <>
      <header className="p-4">
        <Logo black />
      </header>
      <main className="flex flex-1 flex-col gap-6 px-5 pb-6">
        <section className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted">
            {userImage ? (
              <Image
                src={userImage}
                alt={userName}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex size-full items-center justify-center bg-muted">
                <span className="font-heading text-2xl font-bold text-muted-foreground">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <h1 className="font-heading text-xl font-bold text-foreground">
              {data.userName ?? userName}
            </h1>
            <p className="text-sm text-muted-foreground">Plano Básico</p>
          </div>
        </section>
        <ProfileStatsCards
          weightInGrams={weightInGrams}
          heightInCentimeters={heightInCentimeters}
          bodyFatPercentage={bodyFatPercentage}
          age={age}
        />
        <div className="flex justify-center pt-4">
          <LogoutButton />
        </div>
      </main>
    </>
  )
}

export default MePage
