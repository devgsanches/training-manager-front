import { Check, Percent, Timer } from 'lucide-react'

function formatTotalTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  return `${hours}h${minutes.toString().padStart(2, '0')}m`
}

interface StatsCardsProps {
  completedWorkoutsCount: number
  conclusionRate: number
  totalTimeInSeconds: number
}

export const StatsCards = ({
  completedWorkoutsCount,
  conclusionRate,
  totalTimeInSeconds,
}: StatsCardsProps) => {
  const completionPercent = Math.round(conclusionRate * 100)
  const totalTimeFormatted = formatTotalTime(totalTimeInSeconds)

  return (
    <section className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#E8EAF6]">
            <Check className="size-4 text-[#2F63FF]" strokeWidth={2.5} />
          </div>
          <span className="font-heading text-2xl font-bold text-foreground">
            {completedWorkoutsCount}
          </span>
          <span className="text-sm text-muted-foreground">Treinos Feitos</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#E8EAF6]">
            <Percent className="size-4 text-[#2F63FF]" strokeWidth={2.5} />
          </div>
          <span className="font-heading text-2xl font-bold text-foreground">
            {completionPercent}%
          </span>
          <span className="text-sm text-muted-foreground">
            Taxa de conclusão
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-[#E8EAF6]">
          <Timer className="size-4 text-[#2F63FF]" strokeWidth={2.5} />
        </div>
        <span className="font-heading text-2xl font-bold text-foreground">
          {totalTimeFormatted}
        </span>
        <span className="text-sm text-muted-foreground">Tempo Total</span>
      </div>
    </section>
  )
}
