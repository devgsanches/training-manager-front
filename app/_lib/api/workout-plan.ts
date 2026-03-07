import type { GetWorkoutPlanOutputDto } from "./fetch-generated"
import { listWorkoutPlans } from "./fetch-generated"

export async function getWorkoutPlan(
  planId: string
): Promise<GetWorkoutPlanOutputDto | null> {
  const response = await listWorkoutPlans()

  if (response.status !== 200) {
    return null
  }

  const plan = response.data.find((p) => p.id === planId)
  return plan ?? null
}
