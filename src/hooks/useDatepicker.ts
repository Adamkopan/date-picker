import { MouseEvent, useMemo, useState } from 'react'
import { addMonths, format, getMonth, getYear } from 'date-fns'
import { getListOfDaysBasedOnTheDayOfTheWeek } from '../utils/timeUtils'
import { useOutsideClick } from '../hooks/useClickOut'
import { AppI } from '../App'

export interface DayStateI {
  id: string
  day: number
  month: number
  year: number
  isDisabled: boolean
  isSelected: boolean
}

type DaysStateT = {
  key: string
  days: DayStateI[]
}[]

export const useDatepicker = () => {
  const [month, setMonth] = useState(getMonth(new Date()))
  const [year, setYear] = useState(getYear(new Date()))
  const [months, setMonths] = useState<DaysStateT>([
    getListOfDaysBasedOnTheDayOfTheWeek(),
  ])
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const ref = useOutsideClick<HTMLDivElement>(() => {
    setIsDatePickerOpen(false)
  })

  const openDatePicker = () => {
    setIsDatePickerOpen(true)
  }

  const handleDayStateChange = (id: string, month: number) => {
    const currentKey = `${year}-${month}`
    const daysInCurrentMonth = months.find((month) => month.key === currentKey)
      ?.days

    const selectedDay = daysInCurrentMonth?.find((day) => day.id === id)

    const alreadySelectedDaysInCurrentlySelectedMonth = daysInCurrentMonth
      ?.filter((day) => day.isSelected)
      .sort((a, b) => a.day - b.day)

    let nextDaysState: DayStateI[] = []

    if (alreadySelectedDaysInCurrentlySelectedMonth?.length === 0) {
      nextDaysState =
        daysInCurrentMonth?.map((day) => {
          if (day.id === id) {
            return {
              ...day,
              isSelected: !day.isSelected,
            }
          }
          return day
        }) || []
    }

    if (
      alreadySelectedDaysInCurrentlySelectedMonth?.length === 1 &&
      selectedDay
    ) {
      nextDaysState =
        daysInCurrentMonth?.map((day) => {
          if (day.id === id && selectedDay.month === month) {
            return {
              ...day,
              isSelected: !day.isSelected,
            }
          }
          if (
            selectedDay.day > alreadySelectedDaysInCurrentlySelectedMonth[0].day
          ) {
            if (
              day.day > alreadySelectedDaysInCurrentlySelectedMonth[0].day &&
              day.day < selectedDay.day &&
              day.month === month
            ) {
              return {
                ...day,
                isSelected: true,
              }
            }
          } else {
            if (
              day.day < alreadySelectedDaysInCurrentlySelectedMonth[0].day &&
              day.day > selectedDay.day &&
              day.month === month
            ) {
              return {
                ...day,
                isSelected: true,
              }
            }
          }
          return day
        }) || []
    }

    if (
      alreadySelectedDaysInCurrentlySelectedMonth &&
      alreadySelectedDaysInCurrentlySelectedMonth.length > 1
    ) {
      nextDaysState =
        daysInCurrentMonth?.map((day) => ({
          ...day,
          isSelected: day.id === id || false,
        })) || []
    }

    setMonths(() =>
      months.map((month) => {
        if (month.key === currentKey) {
          return {
            ...month,
            days: nextDaysState,
          }
        }
        return {
          ...month,
          days: month.days.map((day) => ({
            ...day,
            isSelected: false,
          })),
        }
      }),
    )

    return nextDaysState
  }

  const clickOnDay =
    (onChangeDate: AppI['onChangeDate']) =>
    (month: number) =>
    (e: MouseEvent<HTMLInputElement>) => {
      const nextDaysState = handleDayStateChange(e.currentTarget.id, month)

      const selectedDays = nextDaysState
        .filter((day) => day.isSelected)
        .sort((a, b) => a.day - b.day)

      onChangeDate(
        selectedDays.map((day) => new Date(day.year, day.month, day.day)),
      )
    }

  const datePickerInputValue = useMemo(() => {
    const daysInMonthWithSelectedDays = months.find((m) =>
      m.days.find((d) => d.isSelected),
    )

    const selectedDays = daysInMonthWithSelectedDays?.days
      ?.filter((day) => day.isSelected)
      .sort((a, b) => a.day - b.day)

    if (selectedDays?.length === 1) {
      return format(new Date(year, month, selectedDays[0].day), 'yyyy-MM-dd')
    }
    if (selectedDays && selectedDays.length > 1) {
      const {
        year: startingYear,
        month: startingMonth,
        day: startingDay,
      } = selectedDays[0]
      const {
        year: endingYear,
        month: endingMonth,
        day: endingDay,
      } = selectedDays[selectedDays.length - 1]
      return `${format(
        new Date(startingYear, startingMonth, startingDay),
        'yyyy-MM-dd',
      )} - ${format(
        new Date(endingYear, endingMonth, endingDay),
        'yyyy-MM-dd',
      )}`
    }

    return ''
  }, [months, month, year])

  const handleClearButtonClick = () => {
    setMonths([getListOfDaysBasedOnTheDayOfTheWeek()])
    setMonth(getMonth(new Date()))
    setYear(getYear(new Date()))
  }

  const onChangeMonth = (type: 'next' | 'previous') => () => {
    const newMonth = month + (type === 'next' ? 1 : -1)
    setYear(() => {
      if (newMonth === 12) {
        return year + 1
      }
      if (newMonth === -1) {
        return year - 1
      }
      return year
    })
    setMonth(() => {
      if (newMonth === 12) {
        return 0
      }
      if (newMonth === -1) {
        return 11
      }
      return newMonth
    })
    if (months.find((d) => d.key === `${year}-${newMonth}`)) return
    if (type === 'next') {
      setMonths((prevState) => [
        ...prevState,
        getListOfDaysBasedOnTheDayOfTheWeek(
          addMonths(new Date(year, month), 1),
        ),
      ])
    }
    if (type === 'previous') {
      setMonths((prevState) => [
        ...prevState,
        getListOfDaysBasedOnTheDayOfTheWeek(
          addMonths(new Date(year, month), -1),
        ),
      ])
    }
  }

  return {
    ref,
    onChangeMonth,
    handleClearButtonClick,
    datePickerInputValue,
    clickOnDay,
    openDatePicker,
    isDatePickerOpen,
    months,
    year,
    month,
  }
}
