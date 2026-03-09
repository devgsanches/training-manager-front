import { Activity, BicepsFlexed, Ruler, Scale, User, WeightTilde } from 'lucide-react'

interface ProfileStatsCardsProps {
  weightInGrams: number | null
  heightInCentimeters: number | null
  bodyFatPercentage: number | null
  age: number | null
}

function formatWeight(grams: number | null): string {
  if (grams === null || grams === undefined) return '-'
  return (grams / 1000).toFixed(1)
}

function formatHeight(cm: number | null): string {
  if (cm === null || cm === undefined) return '-'
  return String(cm)
}

function formatBodyFat(pct: number | null): string {
  if (pct === null || pct === undefined) return '-'
  return `${pct}`
}

function formatAge(age: number | null): string {
  if (age === null || age === undefined) return '-'
  return String(age)
}

export const ProfileStatsCards = ({
  weightInGrams,
  heightInCentimeters,
  bodyFatPercentage,
  age,
}: ProfileStatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#E8EAF6]">
          <WeightTilde className="size-6 text-[#2F63FF]"  />
        </div>
        <span className="font-heading text-2xl font-bold text-foreground">
          {formatWeight(weightInGrams)}
        </span>
        <span className="text-sm text-muted-foreground">KG</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#E8EAF6]">
          <Ruler className="size-6 text-[#2F63FF]"  />
        </div>
        <span className="font-heading text-2xl font-bold text-foreground">
          {formatHeight(heightInCentimeters)}
        </span>
        <span className="text-sm text-muted-foreground">CM</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#E8EAF6]">
          <BicepsFlexed className="size-6 text-[#2F63FF]"  />
        </div>
        <span className="font-heading text-2xl font-bold text-foreground">
          {formatBodyFat(bodyFatPercentage)}
          {bodyFatPercentage !== null && bodyFatPercentage !== undefined ? '%' : ''}
        </span>
        <span className="text-sm text-muted-foreground">GC</span>
      </div>
      <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F4F6FF] p-4">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#E8EAF6]">
          <User className="size-6 text-[#2F63FF]"  />
        </div>
        <span className="font-heading text-2xl font-bold text-foreground">
          {formatAge(age)}
        </span>
        <span className="text-sm text-muted-foreground">ANOS</span>
      </div>
    </div>
  )
}
