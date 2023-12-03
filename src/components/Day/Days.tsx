import { Day } from './/Day'
import { MouseEvent } from 'react'
import { DayStateI } from '../../hooks/useDatepicker'

export interface DaysI {
  days: DayStateI[]
  onClick: (month: number) => (e: MouseEvent<HTMLInputElement>) => void
  month: number
}

export const Days = ({ days, onClick, month }: DaysI) => (
  <div className="w-72 p-1">
    {days.map(({ day, isDisabled, isSelected, id }) => {
      const selectedDaysByIndex = days
        .filter((d) => d.isSelected)
        .map((d) => d.day)

      return (
        <Day
          isFirst={selectedDaysByIndex.sort((a, b) => a - b)[0] === day}
          isLast={
            selectedDaysByIndex.sort((a, b) => a - b)[
              selectedDaysByIndex.length - 1
            ] === day
          }
          day={day}
          id={id}
          isMultipleSelection={isSelected && selectedDaysByIndex.length > 1}
          isDisabled={isDisabled}
          isSelected={isSelected}
          key={id}
          onClick={onClick(month)}
        />
      )
    })}
  </div>
)
