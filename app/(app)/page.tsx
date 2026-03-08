import { headers } from 'next/headers'
import Link from 'next/link'

import { getHomeData } from '@/app/_lib/api/fetch-generated'
import { authClient } from '@/app/_lib/auth-client'

import { Banner } from './_components/Banner'
import { StreakCard } from './_components/StreakCard'
import { WeekConsistency } from './_components/WeekConsistency'
import { WorkoutDayCard } from './_components/WorkoutDayCard'
import dayjs from 'dayjs'

const HomePage = async () => {
  const headersList = await headers()
  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        cookie: headersList.get('cookie') ?? '',
      },
    },
  })

  const userName = session.data?.user?.name ?? 'Atleta'
  const today = dayjs().format('YYYY-MM-DD')
  const homeData = await getHomeData(today)

  if (homeData.status !== 200) {
    return (
      <>
        <Banner userName={userName} />
        <div className="flex flex-1 flex-col gap-6 p-5">
          <p className="text-center text-muted-foreground">
            Você ainda não tem um plano de treino ativo.
          </p>
        </div>
      </>
    )
  }

  const { data } = homeData
  const { activeWorkoutPlanId, todayWorkoutDay, workoutStreak, consistencyByDay } = data

  const firstName = userName.split(' ')[0]

  return (
    <>
      <Banner userName={firstName} todayWorkoutPlanId={activeWorkoutPlanId} />
      <main className="flex flex-1 flex-col gap-6 p-5">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Consistência
            </h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">
              Ver histórico
            </Link>
          </div >
          <div className="flex items-center gap-3 h-24">
            <div className="border border-border rounded-lg p-4 min-h-full max-w-72 md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full h-full">
              <WeekConsistency
                consistencyByDay={consistencyByDay}
                currentDate={today}
              />
            </div>
            <StreakCard count={workoutStreak} />
          </div>
        </section >

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              Treino de hoje
            </h2>
            <Link href="#" className="text-sm font-medium text-primary hover:underline">
              Ver treinos
            </Link>
          </div>
          {/* Planos de treino do usuário pode não ter treinos em um dia específico. Por ex: seg - sexta. */}
          {!todayWorkoutDay ? (
            <div className="flex aspect-16/10 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted px-6 text-center shadow-sm">
              <p className="font-heading text-base font-semibold text-foreground">
                Você não tem um treino para hoje.
              </p>
              <p className="text-sm text-muted-foreground">
                Crie um novo plano no <span className="inline-flex items-center rounded-md bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                  AI Personal
                </span> caso queira treinar hoje.
              </p>
            </div>
          ) : !todayWorkoutDay.isRest ? (
            <Link
              href={`/workout-plan/${data.activeWorkoutPlanId}/days/${todayWorkoutDay?.id}`}
              className="block"
            >
              <WorkoutDayCard workoutDay={todayWorkoutDay} />
            </Link>
          ) : (
            <WorkoutDayCard workoutDay={todayWorkoutDay} />
          )}
        </section>
      </main >
    </>
  )
}

export default HomePage
