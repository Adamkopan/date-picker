import { daysOfWeek } from '../../utils/constants'

export const DaysNames = () => (
  <div className="flex">
    {daysOfWeek.map((day) => (
      <div key={day} className="w-10 h-10 leading-10 text-center">
        {day}
      </div>
    ))}
  </div>
)
