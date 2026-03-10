'use client'

import { cn } from '@/lib/utils'
import { BarChart2, Calendar, House, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { parseAsBoolean, useQueryState } from 'nuqs'

const navItems = [
  { icon: House, href: '/', label: 'Home', key: 'home' },
  { icon: Calendar, href: '/', label: 'Calendário', key: 'calendar' },
  { icon: Sparkles, href: null, label: 'AI', key: 'ai' as const },
  { icon: BarChart2, href: '/stats', label: 'Estatísticas', key: 'stats' },
  { icon: User, href: '/me', label: 'Perfil', key: 'profile' },
] as const

interface NavItem {
  icon: React.ElementType
  label?: string
  href?: string | null
  key: string
}

interface BottomNavProps {
  todayWorkoutHref?: string | null
}

export const BottomNav = ({ todayWorkoutHref = null }: BottomNavProps) => {
  const pathname = usePathname()
  const [, setChatOpen] = useQueryState(
    'chat_open',
    parseAsBoolean.withDefault(false),
  )
  const isOnWorkoutDayPage = /^\/workout-plan\/[^/]+\/days\/[^/]+$/.test(pathname) || /^\/workout-plan\/[^/]+$/.test(pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border rounded-t-2xl bg-background py-4">
      <div className="flex h-16 items-center justify-around">
        {navItems.map(({ icon: Icon, href, label, key }: NavItem) => {
          const effectiveHref = key === 'calendar' && todayWorkoutHref ? todayWorkoutHref : href
          const isActive =
            key === 'home'
              ? pathname === '/'
              : key === 'calendar'
                ? isOnWorkoutDayPage
                : key === 'stats'
                  ? pathname === '/stats'
                  : key === 'profile'
                    ? pathname === '/me'
                    : false

          if (key === 'ai') {
            return (
              <button
                key={key}
                type="button"
                onClick={() => setChatOpen(true)}
                className={cn(
                  'flex flex-1 flex-col items-center justify-center gap-1 h-full',
                )}
                aria-label={label}
              >
                <div className="bg-primary text-primary-foreground rounded-full p-4.5 -mt-2.5">
                  <Icon className="size-6" strokeWidth={2} />
                </div>
              </button>
            )
          }

          return effectiveHref ? (
            <Link
              key={key}
              href={effectiveHref}
              className={cn('flex flex-1 flex-col items-center justify-center gap-1 h-full')}
              aria-label={label}
            >
              <span className="flex items-center justify-center">
                <Icon
                  className={`size-6 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                  strokeWidth={2}
                />
              </span>
            </Link>
          ) : (
            <button
              key={key}
              type="button"
              className="flex flex-1 flex-col items-center justify-center gap-1 p-4 cursor-default text-muted-foreground"
              aria-label={label}
              disabled
            >
              <Icon className="size-6" strokeWidth={2} />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
