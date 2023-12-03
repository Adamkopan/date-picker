import { forwardRef, MouseEvent, Ref } from 'react'
import { DayStateI } from '../../hooks/useDatepicker'

interface DayI {
  id: DayStateI['id']
  isLast: boolean
  isFirst: boolean
  day: DayStateI['day']
  isDisabled: DayStateI['isDisabled']
  isSelected: DayStateI['isSelected']
  isMultipleSelection?: boolean
  onClick: (e: MouseEvent<HTMLInputElement>) => void
}

export const Day = forwardRef((props: DayI, ref: Ref<HTMLInputElement>) => {
  const {
    day,
    isDisabled,
    isSelected,
    onClick,
    id,
    isLast,
    isMultipleSelection,
    isFirst,
  } = props

  const classNames = `${
    isDisabled ? 'bg-white text-teal-300 cursor-not-allowed' : 'cursor-pointer'
  } ${
    isSelected &&
    `rounded bg-sky-950 text-white ${
      isFirst && isMultipleSelection && 'rounded-r-none'
    } ${isLast && 'rounded-l-none'} ${
      isMultipleSelection &&
      !isLast &&
      !isFirst &&
      'rounded-t-none rounded-b-none'
    }`
  } ${
    !isDisabled &&
    !isSelected &&
    'hover:border-cyan-500 hover:border-2 hover:rounded hover:border-solid'
  }`

  return (
    <input
      ref={ref}
      disabled={isDisabled}
      className={`w-10 h-10 leading-10 text-center ${classNames}`}
      onClick={onClick}
      value={day}
      id={id}
      readOnly
    />
  )
})
