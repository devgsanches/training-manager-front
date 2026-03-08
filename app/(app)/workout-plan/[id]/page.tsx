import Link from "next/link"
import { notFound } from "next/navigation"


import { getWorkoutPlan } from "@/app/_lib/api/workout-plan"
import type { WorkoutDayOutputDto } from "@/app/_lib/api/fetch-generated"

import { WorkoutDayCard } from "../../_components/WorkoutDayCard"
import { PlanBanner } from "./_components/PlanBanner"

const WEEKDAY_ORDER = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const

function sortByWeekDay(
  a: WorkoutDayOutputDto,
  b: WorkoutDayOutputDto
): number {
  return (
    WEEKDAY_ORDER.indexOf(a.weekDay as (typeof WEEKDAY_ORDER)[number]) -
    WEEKDAY_ORDER.indexOf(b.weekDay as (typeof WEEKDAY_ORDER)[number])
  )
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function WorkoutPlanPage({ params }: PageProps) {
  const { id: planId } = await params
  const plan = await getWorkoutPlan(planId)

  if (!plan) {
    notFound()
  }

  const sortedDays = [...plan.workoutDays].sort(sortByWeekDay)


  return (
    <div className="flex flex-1 flex-col">
      <PlanBanner name={plan.name} />
      <div className="flex flex-col gap-3 p-5">
        {sortedDays.map((day) => (
          !day.isRest ? (
            <Link
              key={day.id}
              href={`/workout-plan/${planId}/days/${day.id}`}
              className="block"
            >
              <WorkoutDayCard
                workoutDay={{
                  id: day.id,
                  name: day.name,
                  weekDay: day.weekDay,
                  isRest: day.isRest,
                  estimatedDurationInSeconds: day.estimatedDurationInSeconds,
                  coverImageUrl:
                    typeof day.coverImageUrl === "string"
                      ? day.coverImageUrl
                      : undefined,
                  exercisesCount: day.exerciseCount,
                  workoutPlanId: planId,
                }}
              />
            </Link>
          ) : (
            <WorkoutDayCard
              key={day.id}
              workoutDay={{
                id: day.id,
                name: day.name,
                weekDay: day.weekDay,
                isRest: day.isRest,
                estimatedDurationInSeconds: day.estimatedDurationInSeconds,
                coverImageUrl:
                  typeof day.coverImageUrl === "string"
                    ? day.coverImageUrl
                    : undefined,
                exercisesCount: day.exerciseCount,
                workoutPlanId: planId,
              }}
            />
          )
        ))}
      </div>
    </div>
  )
}
