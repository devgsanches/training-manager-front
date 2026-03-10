import dayjs from 'dayjs'

import { getStats } from '@/app/_lib/api/fetch-generated'

import { ConsistencyHeatmap } from '../_components/ConsistencyHeatmap'
import { Logo } from '../_components/Logo'
import { StatsCards } from '../_components/StatsCards'
import { StatsStreakCard } from '../_components/StatsStreakCard'

const StatsPage = async () => {
  const today = dayjs()
  const from = today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD')
  const to = today.format('YYYY-MM-DD')
  const timezoneOffset = 0

  const statsResponse = await getStats({ from, to, timezoneOffset })

  if (statsResponse.status !== 200) {
    return (
      <main className="flex flex-1 flex-col gap-6 p-5">
        <Logo />
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-muted px-6 py-12 text-center">
          <p className="font-heading text-base font-semibold text-foreground">
            Não foi possível carregar suas estatísticas.
          </p>
          <p className="text-sm text-muted-foreground">
            Tente novamente mais tarde.
          </p>
        </div>
      </main>
    )
  }

  const { data } = statsResponse

  return (
    <>
      <header className="p-4">
        <Logo black />
      </header>
      <main className="flex flex-1 flex-col gap-6 px-5 pb-6">
        <StatsStreakCard count={data.workoutStreak} />
        <section>
          <h2 className="mb-3 font-heading text-xl font-semibold text-foreground">
            Consistência
          </h2>
          <div className="rounded-xl bg-white">
            <ConsistencyHeatmap
              consistencyByDay={data.consistencyByDay}
              currentDate={today.format('YYYY-MM-DD')}
            />
          </div>
        </section>
        <StatsCards
          completedWorkoutsCount={data.completedWorkoutsCount}
          conclusionRate={data.conclusionRate}
          totalTimeInSeconds={data.totalTimeInSeconds}
        />
      </main>
    </>
  )
}

export default StatsPage
