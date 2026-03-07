"use client"

import { useTransition } from "react"

import { Button } from "@/components/ui/button"
import type { WorkoutDaySessionOutputDto } from "@/app/_lib/api/fetch-generated"

import { handleStartWorkout, handleCompleteWorkout } from "@/app/(app)/workout-plan/[id]/days/[dayId]/actions"

type SessionState = "completed" | "in_progress" | "none"

function getSessionState(
  sessions: WorkoutDaySessionOutputDto[]
): { state: SessionState; sessionId?: string } {
  const completed = sessions.find((s) => s.completedAt)
  if (completed) return { state: "completed" }

  const inProgress = sessions.find((s) => !s.completedAt)
  if (inProgress) return { state: "in_progress", sessionId: inProgress.id }

  return { state: "none" }
}

interface WorkoutActionButtonProps {
  planId: string
  dayId: string
  sessions: WorkoutDaySessionOutputDto[]
  /** "card" = Iniciar/Concluído no card; "below" = Marcar concluído abaixo da lista */
  placement: "card" | "below"
}

export const WorkoutActionButton = ({
  planId,
  dayId,
  sessions,
  placement,
}: WorkoutActionButtonProps) => {
  const [isPending, startTransition] = useTransition()
  const { state, sessionId } = getSessionState(sessions)

  if (placement === "card" && state !== "none" && state !== "completed") {
    return null
  }

  if (state === "completed") {
    return (
      <Button
        variant="ghost"
        className={placement === "below" ? "w-full" : "shrink-0"}
      >
        Concluído!
      </Button>
    )
  }

  if (state === "in_progress" && sessionId) {
    return (
      <Button
        variant="outline"
        className="w-full"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await handleCompleteWorkout(planId, dayId, sessionId)
          })
        }}
      >
        {isPending ? "Salvando..." : "Marcar como concluído"}
      </Button>
    )
  }

  return (
    <Button
      className={placement === "below" ? "w-full bg-primary text-primary-foreground" : "shrink-0 bg-primary text-primary-foreground rounded-full"}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await handleStartWorkout(planId, dayId)
        })
      }}
    >
      {isPending ? "Iniciando..." : "Iniciar treino"}
    </Button>
  )
}
