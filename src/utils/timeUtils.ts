import {
  addMonths,
  getDaysInMonth,
  getMonth,
  getYear,
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
  subMonths,
} from 'date-fns'
import { v4 as uuidv4 } from 'uuid'

export const getListOfDaysInMonth = (date?: Date) =>
  Array.from(Array(getDaysInMonth(date || new Date())).keys()).map(
    (day) => day + 1,
  )

export const getListOfDaysFromTheBeginningOrEndOfTheMonth = (
  till: 'beginning' | 'end',
  date: Date,
  amountOfDays: number,
) => {
  if (till === 'beginning') {
    return Array.from(Array(amountOfDays).keys()).map((day) => day + 1)
  } else {
    return amountOfDays
      ? Array.from(Array(getDaysInMonth(subMonths(date, 1))).keys())
          .map((day) => day + 1)
          .slice(-amountOfDays)
      : []
  }
}

export const mapDaysToStateStructure = (
  days: number[],
  isSelected: boolean,
  isDisabled: boolean,
  month: number,
  year: number,
) =>
  days.map((day) => ({
    id: uuidv4(),
    day,
    isSelected,
    isDisabled,
    month,
    year,
  }))

export const getDaysFromTheBeginningAndEndOfTheMonth = (
  monthStartsAt: number,
  date: Date,
  shouldBeDaysInTheList = 42,
) => {
  const theDate = date || new Date()
  const daysInMonth = getListOfDaysInMonth(theDate)
  const daysFromThePreviousMonth = getListOfDaysFromTheBeginningOrEndOfTheMonth(
    'end',
    theDate,
    monthStartsAt,
  )
  const daysFromTheNextMonth = getListOfDaysFromTheBeginningOrEndOfTheMonth(
    'beginning',
    theDate,
    shouldBeDaysInTheList -
      daysInMonth.length -
      daysFromThePreviousMonth.length,
  )

  const currentMonth = getMonth(theDate)
  const previousMonth = getMonth(subMonths(theDate, 1))
  const nextMonth = getMonth(addMonths(theDate, 1))
  const currentYear = getYear(theDate)
  const previousYear = getYear(subMonths(theDate, 1))
  const nextYear = getYear(addMonths(theDate, 1))

  return [
    ...mapDaysToStateStructure(
      daysFromThePreviousMonth,
      false,
      true,
      previousMonth,
      previousYear,
    ),
    ...mapDaysToStateStructure(
      daysInMonth,
      false,
      false,
      currentMonth,
      currentYear,
    ),
    ...mapDaysToStateStructure(
      daysFromTheNextMonth,
      false,
      true,
      nextMonth,
      nextYear,
    ),
  ]
}

const getMonthStartsAtDay = (date?: Date) => {
  const theDate = date || new Date()
  if (isMonday(theDate)) {
    return 0
  } else if (isTuesday(theDate)) {
    return 1
  } else if (isWednesday(theDate)) {
    return 2
  } else if (isThursday(theDate)) {
    return 3
  } else if (isFriday(theDate)) {
    return 4
  } else if (isSaturday(theDate)) {
    return 5
  } else if (isSunday(theDate)) {
    return 6
  } else {
    return 0
  }
}

export const getListOfDaysBasedOnTheDayOfTheWeek = (date?: Date) => {
  const theDate = date || new Date()

  return {
    key: `${getYear(theDate)}-${getMonth(theDate)}`,
    days: getDaysFromTheBeginningAndEndOfTheMonth(
      getMonthStartsAtDay(theDate),
      theDate,
    ),
  }
}
