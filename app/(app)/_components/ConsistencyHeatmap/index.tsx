import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import type { GetStatsOutputDtoConsistencyByDay } from '@/app/_lib/api/fetch-generated'

dayjs.extend(isoWeek)

const WEEKDAY_LABELS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'] as const
const MONTH_LABELS: Record<number, string> = {
  1: 'Jan',
  2: 'Fev',
  3: 'Mar',
  4: 'Abr',
  5: 'Maio',
  6: 'Jun',
  7: 'Jul',
  8: 'Ago',
  9: 'Set',
  10: 'Out',
  11: 'Nov',
  12: 'Dez',
}

type CellState = 'completed' | 'started' | 'none'

function getCellState(
  consistencyByDay: GetStatsOutputDtoConsistencyByDay,
  dateKey: string
): CellState {
  const day = consistencyByDay[dateKey]
  if (day?.workoutDayCompleted) return 'completed'
  if (day?.workoutDayStarted) return 'started'
  return 'none'
}

interface ConsistencyHeatmapProps {
  consistencyByDay: GetStatsOutputDtoConsistencyByDay
  currentDate: string
}

const CELL_COMPLETED = 'bg-[#2F63FF]'
const CELL_STARTED = 'bg-[#DDE6FF]'
const CELL_NONE = 'border border-border bg-[#f5f5f5]'

export const ConsistencyHeatmap = ({
  consistencyByDay,
  currentDate,
}: ConsistencyHeatmapProps) => {
  const today = dayjs(currentDate)
  const months: dayjs.Dayjs[] = []
  for (let i = 3; i >= 0; i--) {
    months.push(today.subtract(i, 'month').startOf('month'))
  }

  return (
    <div className="flex flex-row flex-wrap gap-6">
      {months.map((monthStart) => {
        const monthKey = monthStart.format('YYYY-MM')
        const monthLabel = MONTH_LABELS[monthStart.month() + 1]
        const lastDay = monthStart.endOf('month')
        const firstWeekday = monthStart.isoWeekday() - 1
        const daysInMonth = lastDay.date()
        const totalCells = firstWeekday + daysInMonth
        const numRows = Math.ceil(totalCells / 7)

        const grid: (string | null)[][] = Array.from(
          { length: numRows },
          () => Array(7).fill(null)
        )

        for (let d = 1; d <= daysInMonth; d++) {
          const date = monthStart.date(d)
          const dateKey = date.format('YYYY-MM-DD')
          const idx = firstWeekday + (d - 1)
          const row = Math.floor(idx / 7)
          const col = idx % 7
          grid[row][col] = dateKey
        }

        return (
          <div key={monthKey} className="flex flex-col items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {monthLabel}
            </span>
            <div className="flex gap-1 text-[10px] text-muted-foreground">
              {WEEKDAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className="flex size-5 shrink-0 items-center justify-center"
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {grid.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-1">
                  {row.map((dateKey, colIdx) => {
                    const state = dateKey
                      ? getCellState(consistencyByDay, dateKey)
                      : 'none'
                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`size-5 shrink-0 rounded-sm ${
                          state === 'completed'
                            ? CELL_COMPLETED
                            : state === 'started'
                              ? CELL_STARTED
                              : CELL_NONE
                        }`}
                        title={dateKey ?? ''}
                        aria-label={dateKey ?? 'empty'}
                      />
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
