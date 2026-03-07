"use server"

import { revalidatePath } from "next/cache"

import {
  startWorkoutSession,
  completeWorkoutSession,
} from "@/app/_lib/api/fetch-generated"

export async function handleStartWorkout(planId: string, dayId: string) {
  const res = await startWorkoutSession(planId, dayId)
  if (res.status === 201) {
    revalidatePath(`/workout-plan/${planId}/days/${dayId}`)
  }
  return res
}

export async function handleCompleteWorkout(
  planId: string,
  dayId: string,
  sessionId: string
) {
  const res = await completeWorkoutSession(planId, dayId, sessionId, {
    completedAt: new Date().toISOString(),
  })
  if (res.status === 200) {
    revalidatePath(`/workout-plan/${planId}/days/${dayId}`)
  }
  return res
}
