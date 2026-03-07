import dayjs from "dayjs"

import type { HomeResponseConsistencyByDay } from "@/app/_lib/api/fetch-generated"

const WEEK_LABELS = [
  { label: "S", dayOffset: 1 },
  { label: "T", dayOffset: 2 },
  { label: "Q", dayOffset: 3 },
  { label: "Q", dayOffset: 4 },
  { label: "S", dayOffset: 5 },
  { label: "S", dayOffset: 6 },
  { label: "D", dayOffset: 0 },
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
  const weekStart = dayjs(currentDate).startOf("week")
  const todayKey = dayjs(currentDate).format("YYYY-MM-DD")

  return (
    <div className="flex gap-2 h-full">
      {WEEK_LABELS.map(({ label, dayOffset }, index) => {
        const date = weekStart.add(dayOffset === 0 ? 0 : dayOffset, "day")
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
