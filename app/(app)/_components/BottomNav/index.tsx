'use client'

import { cn } from '@/lib/utils'
import { BarChart2, Calendar, House, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { icon: House, href: '/', label: 'Home' },
  { icon: Calendar, href: '/calendar', label: 'Calendário' },
  { icon: Sparkles, href: null, label: 'AI' },
  { icon: BarChart2, href: '/stats', label: 'Estatísticas' },
  { icon: User, href: '/me', label: 'Perfil' },
] as const

interface NavItem {
  icon: React.ElementType
  label?: string
  href?: string | null
  onClick?: () => void
}

export const BottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border rounded-t-2xl bg-background py-4">
      <div className="flex h-16 items-center justify-around">
        {navItems.map(({ icon: Icon, href, label }: NavItem) => {
          const isActive = href === '/' && pathname === '/'

          return href ? (
            <Link
              key={label}
              href={href}
              className={cn('flex flex-1 flex-col items-center justify-center gap-1 h-full')}
              aria-label={label}
            >
              <span
                className={`flex items-center justify-center`}
              >
                <Icon
                  className={`size-6 ${isActive ? 'text-foreground' : 'text-muted-foreground '}`}
                  strokeWidth={2}
                />
              </span>
            </Link>
          ) : (
            <button
              key={label}
              type="button"
              className={cn('flex  flex-1 flex-col items-center justify-center gap-1 p-4 cursor-default text-muted-foreground'
              )}
              aria-label={label}
              disabled
            >
              <div className={cn('', label === 'AI' ? 'bg-primary text-muted rounded-full p-4.5 -mt-2.5' : '')}><Icon className="size-6" strokeWidth={2} /> </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
