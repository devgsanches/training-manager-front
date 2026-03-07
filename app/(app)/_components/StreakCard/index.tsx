import { Flame } from "lucide-react"

interface StreakCardProps {
  count: number
}

export const StreakCard = ({ count }: StreakCardProps) => (
  <div className="flex flex-1 items-center gap-2 rounded-3xl bg-streak min-h-full">
    <div className="flex items-center gap-2 flex-1 justify-center"> <Flame className="size-6 text-streak-foreground" fill="#F06100" />
      <span className="font-heading text-xl font-bold text-foreground">
        {count}
      </span></div>
  </div>
)
