import { DateHeader } from '../DateHeader/DateHeader'
import { Days, DaysI } from '../Day/Days'
import { ForwardedRef, forwardRef } from 'react'
import { DaysNames } from '../DaysNames/DaysNames'
import { DayStateI } from '../../hooks/useDatepicker'

interface MonthI {
  year: number
  month: {
    index: number
    name: string
  }
  days: DayStateI[]
  onClick: DaysI['onClick']
  onChangeMonth: (type: 'next' | 'previous') => () => void
}

export const Month = forwardRef(
  (
    { days, onClick, month, year, onChangeMonth }: MonthI,
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      className="border rounded border-red flex w-[calc(18rem+2px)] flex-col items-center absolute top-[calc(100%+2px)] left-0 bg-white"
    >
      <DateHeader
        onChangeMonth={onChangeMonth}
        year={year}
        month={month.name}
      />
      <DaysNames />
      <Days days={days} onClick={onClick} month={month.index} />
    </div>
  ),
)
