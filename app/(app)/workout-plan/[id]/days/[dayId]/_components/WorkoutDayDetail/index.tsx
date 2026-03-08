import Image from "next/image"
import { Calendar, Clock, Dumbbell } from "lucide-react"

import type {
  GetWorkoutDayOutputDto,
  WorkoutDaySessionOutputDto,
} from "@/app/_lib/api/fetch-generated"

import { WorkoutActionButton } from "../WorkoutActionButton"

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

function getSessionState(sessions: WorkoutDaySessionOutputDto[]) {
  const completed = sessions.some((s) => s.completedAt)
  const inProgress = sessions.some((s) => !s.completedAt)
  if (completed) return "completed"
  if (inProgress) return "in_progress"
  return "none"
}

interface WorkoutDayDetailProps {
  workoutDay: GetWorkoutDayOutputDto
  planId: string
}

export const WorkoutDayDetail = ({
  workoutDay,
  planId,
}: WorkoutDayDetailProps) => {
  const {
    name,
    weekDay,
    estimatedDurationInSeconds,
    coverImageUrl,
    exercises,
    sessions,
  } = workoutDay

  const dayLabel = WEEKDAY_PT[weekDay] ?? weekDay
  const sessionState = getSessionState(sessions)
  const showButtonInCard =
    sessionState === "none" || sessionState === "completed"

  const coverUrl =
    typeof coverImageUrl === "string" ? coverImageUrl : undefined

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="relative aspect-16/10 bg-muted">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-muted-foreground">
              {name}
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-lg px-2 py-1 bg-background/16 ">
          <Calendar className="size-3.5 text-white/90" strokeWidth={2} />
          <span className="text-xs font-semibold text-white">{dayLabel}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-semibold text-white drop-shadow-sm text-2xl">
              {name}
            </h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm text-white/80">
              <span className="flex items-center gap-1">
                <Clock className="size-4" strokeWidth={2} />
                {formatDuration(estimatedDurationInSeconds)}
              </span>
              <span className="flex items-center gap-1">
                <Dumbbell className="size-4" strokeWidth={2} />
                {exercises.length} exercícios
              </span>
            </div>
          </div>
          {showButtonInCard && (
            <div className="shrink-0">
              <WorkoutActionButton
                planId={planId}
                dayId={workoutDay.id}
                sessions={sessions}
                placement="card"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
