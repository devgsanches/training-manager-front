import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"

import type { HomeResponseConsistencyByDay } from "@/app/_lib/api/fetch-generated"

dayjs.extend(isoWeek)

const WEEK_LABELS = [
  { label: "S", dayOffset: 0 },
  { label: "T", dayOffset: 1 },
  { label: "Q", dayOffset: 2 },
  { label: "Q", dayOffset: 3 },
  { label: "S", dayOffset: 4 },
  { label: "S", dayOffset: 5 },
  { label: "D", dayOffset: 6 },
] as const

type ConsistencyState = "completed" | "started" | "today" | "none"

function getConsistencyState(
  consistencyByDay: HomeResponseConsistencyByDay,
  dateKey: string,
  isToday: boolean
): ConsistencyState {
  const day = consistencyByDay[dateKey]
  if (day?.workoutDayCompleted) return "completed"
  if (day?.workoutDayStarted) return "started" // inclui hoje quando deu start no treino
  if (isToday) return "today"
  return "none"
}

interface WeekConsistencyProps {
  consistencyByDay: HomeResponseConsistencyByDay
  currentDate: string
}

export const WeekConsistency = ({
  consistencyByDay,
  currentDate,
}: WeekConsistencyProps) => {
  const weekStart = dayjs(currentDate).startOf("isoWeek")
  const todayKey = dayjs(currentDate).format("YYYY-MM-DD")

  return (
    <div className="flex gap-2 h-full">
      {WEEK_LABELS.map(({ label, dayOffset }, index) => {
        const date = weekStart.add(dayOffset, "day")
        const dateKey = date.format("YYYY-MM-DD")
        const isToday = dateKey === todayKey
        const state = getConsistencyState(consistencyByDay, dateKey, isToday)

        return (
          <div
            key={`${label}-${index}`}
            className="flex flex-1 flex-col items-center justify-center gap-2 h-full"
          >

            <div
              className={`size-6 rounded-sm ${state === "completed"
                ? "bg-primary"
                : state === "started"
                  ? "bg-primary/50"
                  : state === "today"
                    ? "border-2 border-primary bg-background"
                    : "border border-border bg-background"
                }`}
            />

            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        )
      })}
    </div>
  )
}
