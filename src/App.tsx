import React from 'react'
import './App.css'
import { Month } from './components/Month/Month'
import { monthsByNumber } from './utils/constants'
import { DatePickerInput } from './components/DatePickerInput/DatePickerInput'
import { ClearDatesButton } from './components/ClearDatesButton/ClearDatesButton'
import { useDatepicker } from './hooks/useDatepicker'

export interface AppI {
  onChangeDate: (date: Date[]) => void
}

function App({ onChangeDate }: AppI) {
  const {
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
  } = useDatepicker()

  const days = months.find((m) => m.key === `${year}-${month}`)?.days

  return (
    <div className="App">
      <div className="relative self-start">
        <DatePickerInput
          onClick={openDatePicker}
          value={datePickerInputValue}
        />
        <ClearDatesButton onClick={handleClearButtonClick} />
        {isDatePickerOpen && days && (
          <Month
            onChangeMonth={onChangeMonth}
            ref={ref}
            days={days}
            onClick={clickOnDay(onChangeDate)}
            month={monthsByNumber[month]}
            year={year}
          />
        )}
      </div>
    </div>
  )
}

export default App
