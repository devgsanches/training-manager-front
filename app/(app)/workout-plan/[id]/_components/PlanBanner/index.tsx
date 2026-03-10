import Image from 'next/image'

import { Logo } from '@/app/(app)/_components/Logo'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Goal } from 'lucide-react'

type PlanBannerProps = {
  name: string
}

export const PlanBanner = ({ name }: PlanBannerProps) => (
  <div className={cn('relative h-74 overflow-hidden rounded-b-3xl')}>
    <Image
      src="/plan-banner.png"
      alt=""
      priority
      fill
      sizes="100vw"
      className="object-cover object-[center_65%]"
    />
    <div className="relative flex h-full flex-col justify-between p-4">
      <Logo />
      <div className="mb-4 flex flex-col gap-3">
        <Badge variant={'default'} className="h-6.5 font-semibold uppercase flex items-center gap-1">
          <div>
            <Goal size={18} />
          </div>
          {name}
        </Badge>
        <p className="text-2xl text-background font-semibold">Plano de Treino
        </p>
      </div>
    </div>
  </div>
)
