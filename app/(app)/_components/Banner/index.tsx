import Image from 'next/image'
import Link from 'next/link'

import { Logo } from '../Logo'

type BannerProps = {
  userName?: string
  todayWorkoutPlanId?: string
}

export const Banner = async ({ userName, todayWorkoutPlanId }: BannerProps) => {
  return (
    <div className="relative h-74 overflow-hidden rounded-b-3xl">
      <Image
        src="/banner.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_65%]"
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative flex h-full flex-col justify-between p-4">
        <div className="absolute top-4">
          <Logo />
        </div>
        <div className="h-full flex items-end justify-between mb-10">
          <div className="flex flex-col text-white font-main">
            <p className="text-2xl font-semibold truncate">Olá, {userName ?? 'usuário'}</p>
            <p className="text-sm text-primary-foreground/90">Bora treinar hoje?</p>
          </div>
          <div className="flex items-end font-main">
            {todayWorkoutPlanId && <Link href={`/workout-plan/${todayWorkoutPlanId}`} className="text-white cursor-pointer font-semibold rounded-full text-sm bg-primary px-4 py-2">Bora!</Link>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
