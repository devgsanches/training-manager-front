import Image from "next/image"
import { Calendar, Clock, Dumbbell, Zap } from "lucide-react"

import type { TodayWorkoutDay } from "@/app/_lib/api/fetch-generated"

const WEEKDAY_PT: Record<string, string> = {
  MONDAY: "SEGUNDA",
  TUESDAY: "TERÇA",
  WEDNESDAY: "QUARTA",
  THURSDAY: "QUINTA",
  FRIDAY: "SEXTA",
  SATURDAY: "SÁBADO",
  SUNDAY: "DOMINGO",
}

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  return `${mins}min`
}

interface WorkoutDayCardProps {
  workoutDay: TodayWorkoutDay
}

export const WorkoutDayCard = ({ workoutDay }: WorkoutDayCardProps) => {

  const {
    name,
    isRest,
    weekDay,
    estimatedDurationInSeconds,
    coverImageUrl,
    exercisesCount } = workoutDay

  const dayLabel = WEEKDAY_PT[weekDay] ?? weekDay

  if (isRest) {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm dark:bg-background max-h-27.5 h-full">
        <div className="flex flex-col p-3 gap-5">
          <div className="flex items-center gap-1.5 self-start rounded-lg bg-muted-foreground/16 px-2 py-1">
            <Calendar className="size-3.5 text-foreground" strokeWidth={2} />
            <span className="text-xs font-semibold text-foreground">{dayLabel}</span>
          </div>
          <div className="flex flex-1 items-center gap-2">
            <Zap className="size-7 text-primary" strokeWidth={2} fill="currentColor" />
            <h3 className="text-2xl font-semibold text-foreground">Descanso</h3>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-16/10 bg-muted">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">{name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/20" />
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg bg-background/16 px-2 py-1">
          <Calendar className="size-3.5 text-muted" strokeWidth={2} />
          <span className="text-xs font-semibold text-muted">{dayLabel}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-semibold text-muted drop-shadow-sm text-2xl">{name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-muted/70">
            <span className="flex items-center gap-1">
              <Clock className="size-4" strokeWidth={2} />
              {formatDuration(estimatedDurationInSeconds)}
            </span>
            <span className="flex items-center gap-1">
              <Dumbbell className="size-4" strokeWidth={2} />
              {exercisesCount} exercícios
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
