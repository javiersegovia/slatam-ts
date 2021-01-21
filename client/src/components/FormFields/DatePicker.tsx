import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DayModifiers } from 'react-day-picker/types/Modifiers'
// import {
//   Control,
//   Controller,
//   FieldName,
//   FieldValues,
//   FieldErrors,
//   FieldError,
//   RegisterOptions,
// } from 'react-hook-form'

const DatePicker = () => {
  const [currentDate, setCurrentDate] = useState<Date>()
  const [, setDateInfo] = useState<{
    isEmpty: boolean
    isDisabled: boolean
  } | null>(null)

  const handleDayChange = (
    selectedDay: Date,
    modifiers: DayModifiers,
    dayPickerInput: DayPickerInput
  ) => {
    const input = dayPickerInput.getInput()
    setCurrentDate(selectedDay)
    setDateInfo({
      isEmpty: !input.value.trim(),
      isDisabled: modifiers.disabled === true,
    })
  }

  console.log('rendering DatePicker')

  return (
    <div>
      <DayPickerInput
        value={currentDate}
        onDayChange={handleDayChange}
        // ref={ref}
        dayPickerProps={{
          selectedDays: currentDate,
          disabledDays: {
            daysOfWeek: [0, 6],
          },
        }}
      />
      {/* <Controller
        name={name}
        control={control}
        render={({ onChange, onBlur, value, ref }) => {
          console.log({ value, ref })
          return (
            
          )
        }} */}
      {/* /> */}
    </div>
  )
}

export default DatePicker
