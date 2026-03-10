import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { getStats } from '@/app/_lib/api/fetch-generated'
import {
  getTodayInUserTimezone,
  getTimezoneOffsetMinutes,
} from '@/app/_lib/timezone'

import { ConsistencyHeatmap } from '../_components/ConsistencyHeatmap'
import { Logo } from '../_components/Logo'
import { StatsCards } from '../_components/StatsCards'
import { StatsStreakCard } from '../_components/StatsStreakCard'

dayjs.extend(utc)

const StatsPage = async () => {
  const [todayStr, timezoneOffset] = await Promise.all([
    getTodayInUserTimezone(),
    getTimezoneOffsetMinutes(),
  ])
  const today = dayjs.utc(todayStr).utcOffset(timezoneOffset)
  const from = today.subtract(3, 'month').startOf('month').format('YYYY-MM-DD')
  const to = todayStr

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
