import { MouseEvent, forwardRef, ForwardedRef } from 'react'

interface DatePickerInputI {
  value: string
  onClick: (e: MouseEvent<HTMLInputElement>) => void
}

export const DatePickerInput = forwardRef(
  (
    { value, onClick }: DatePickerInputI,
    ref: ForwardedRef<HTMLInputElement>,
  ) => (
    <input
      ref={ref}
      onClick={onClick}
      type="text"
      value={value}
      readOnly
      className="w-58 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 cursor-pointer"
      placeholder="Input date..."
    />
  ),
)
