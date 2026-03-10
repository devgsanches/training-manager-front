import { notFound } from "next/navigation"

import {
  getHomeData,
  getWorkoutDay,
} from "@/app/_lib/api/fetch-generated"
import { getTodayInUserTimezone } from "@/app/_lib/timezone"

import { ExerciseCard } from "./_components/ExerciseCard"
import { Topbar } from "./_components/Topbar"
import { WorkoutActionButton } from "./_components/WorkoutActionButton"
import { WorkoutDayDetail } from "./_components/WorkoutDayDetail"

const WEEKDAY_TITLE: Record<string, string> = {
  MONDAY: "Segunda",
  TUESDAY: "Terça",
  WEDNESDAY: "Quarta",
  THURSDAY: "Quinta",
  FRIDAY: "Sexta",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
}

interface PageProps {
  params: Promise<{ id: string; dayId: string }>
}

export default async function WorkoutDayPage({ params }: PageProps) {
  const { id: planId, dayId } = await params
  const today = await getTodayInUserTimezone()
  const [workoutDayResponse, homeData] = await Promise.all([
    getWorkoutDay(planId, dayId),
    getHomeData(today),
  ])

  if (workoutDayResponse.status !== 200) {
    notFound()
  }

  const { data } = workoutDayResponse
  const sessionJustStarted = data.sessions.find((session) => session.startedAt && !session.completedAt)

  const isToday =
    homeData.status === 200 &&
    homeData.data.todayWorkoutDay?.id === dayId

  if (data.isRest) {
    return (
      <div className="flex flex-1 flex-col gap-6 p-5">
        <p className="text-center text-muted-foreground">
          Este é um dia de descanso.
        </p>
      </div>
    )
  }

  const title = isToday
    ? "Treino de Hoje"
    : WEEKDAY_TITLE[data.weekDay] ?? data.weekDay

  return (
    <div className="flex flex-1 flex-col">
      <Topbar title={title} />
      <div className="p-5">
        <WorkoutDayDetail workoutDay={data} planId={planId} isToday={isToday} />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-2">
          {data.exercises
            .sort((a, b) => a.order - b.order)
            .map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
        </div>
        {sessionJustStarted && (
          <WorkoutActionButton
            planId={planId}
            dayId={dayId}
            sessions={data.sessions}
            placement="below"
          />
        )}
      </div>
    </div>
  )
}
