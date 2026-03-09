import { Flame } from 'lucide-react'

interface StatsStreakCardProps {
  count: number
}

export const StatsStreakCard = ({ count }: StatsStreakCardProps) => {
  const isZero = count === 0

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-6 min-h-[210px] w-full overflow-hidden ${isZero
        ? 'bg-linear-to-b from-[#2d2d2d] to-[#1a1a1a]'
        : "bg-[url('/stats-banner.png')] bg-cover bg-center bg-no-repeat"
        }`}
    >
      <div
        className={`flex size-14 items-center justify-center rounded-full border border-white/30 ${isZero ? 'bg-white/10' : 'bg-[#ffb380]/40'
          }`}
      >
        <Flame
          className="size-10 text-transparent"
          fill={isZero ? '#fff' : '#F06100'}
        />
      </div>
      <span className="font-heading text-5xl font-bold text-white">
        {count} {count === 1 ? 'dia' : 'dias'}
      </span>
      <span
        className={`text-base font-light ${isZero ? 'text-white/80' : 'text-white/90'}`}
      >
        Sequência Atual
      </span>
    </div>
  )
}
