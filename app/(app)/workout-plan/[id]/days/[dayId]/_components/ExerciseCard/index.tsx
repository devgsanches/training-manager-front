'use client'

import { HelpCircle, Zap } from "lucide-react"
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs"

import type { WorkoutDayExerciseOutputDto } from "@/app/_lib/api/fetch-generated"

interface ExerciseCardProps {
  exercise: WorkoutDayExerciseOutputDto
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const [, setChatParams] = useQueryStates({
    chat_open: parseAsBoolean.withDefault(false),
    chat_initial_message: parseAsString,
  })
  const { name, sets, reps, restTimeInSeconds } = exercise

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-1 flex-col gap-2">
        <h4 className="font-semibold text-foreground">{name}</h4>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {sets} SÉRIES
          </span>
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {reps} REPS
          </span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            <Zap className="size-3" strokeWidth={2} />
            {restTimeInSeconds}S
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          setChatParams({
            chat_open: true,
            chat_initial_message: `Como executar o exercício ${name} corretamente?`,
          })
        }
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-muted/80"
        aria-label="Mais informações"
      >
        <HelpCircle className="size-4" strokeWidth={2} />
      </button>
    </div>
  )
}
