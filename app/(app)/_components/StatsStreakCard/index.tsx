import Image from 'next/image'
import { Flame } from 'lucide-react'

interface StatsStreakCardProps {
  count: number
}

export const StatsStreakCard = ({ count }: StatsStreakCardProps) => {
  const isZero = count === 0

  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl p-6 min-h-[210px] w-full ${isZero
        ? 'bg-linear-to-b from-[#2d2d2d] to-[#1a1a1a]'
        : ''
        }`}
    >
      {!isZero && (
        <Image
          src="/stats-banner.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover object-center"
          priority
        />
      )}
      <div
        className={`relative z-10 flex size-14 items-center justify-center rounded-full border border-white/30 ${isZero ? 'bg-white/10' : 'bg-[#ffb380]/40'
          }`}
      >
        <Flame
          className="size-10 text-transparent"
          fill={isZero ? '#fff' : '#F06100'}
        />
      </div>
      <span className="relative z-10 font-heading text-5xl font-bold text-white">
        {count} {count === 1 ? 'dia' : 'dias'}
      </span>
      <span
        className={`relative z-10 text-base font-light ${isZero ? 'text-white/80' : 'text-white/90'}`}
      >
        Sequência Atual
      </span>
    </div>
  )
}
