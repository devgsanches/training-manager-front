import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const TZ_OFFSET_COOKIE = 'tz_offset'
const DEFAULT_OFFSET = -180 // UTC-3 (Brasil) como fallback

/**
 * Retorna o offset de timezone em minutos (para passar à API).
 * Positivo = UTC+X, Negativo = UTC-X
 */
export async function getTimezoneOffsetMinutes(): Promise<number> {
  const cookieStore = await cookies()
  const tzOffset = cookieStore.get(TZ_OFFSET_COOKIE)?.value

  return tzOffset ? -Number.parseInt(tzOffset, 10) : DEFAULT_OFFSET
}

/**
 * Retorna a data de "hoje" no fuso horário do usuário.
 * Usa o cookie tz_offset setado pelo cliente, ou fallback para UTC-3.
 */
export async function getTodayInUserTimezone(): Promise<string> {
  const offsetMinutes = await getTimezoneOffsetMinutes()
  return dayjs().utcOffset(offsetMinutes).format('YYYY-MM-DD')
}
