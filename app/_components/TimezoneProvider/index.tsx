'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const TZ_OFFSET_COOKIE = 'tz_offset'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1 ano

export function TimezoneProvider() {
  const router = useRouter()

  useEffect(() => {
    const offset = new Date().getTimezoneOffset()
    const currentCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${TZ_OFFSET_COOKIE}=`))
    const currentValue = currentCookie?.split('=')[1]

    if (currentValue !== String(offset)) {
      document.cookie = `${TZ_OFFSET_COOKIE}=${offset}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`
      router.refresh()
    }
  }, [router])

  return null
}
