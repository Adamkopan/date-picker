import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

export interface DateHeaderI {
  year: number
  month: string
  onChangeMonth: (type: 'next' | 'previous') => () => void
}

export const DateHeader = ({ year, month, onChangeMonth }: DateHeaderI) => {
  return (
    <div className="flex justify-between w-[100%]">
      <button className="px-4" onClick={onChangeMonth('previous')}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <div className="text-lg font-medium text-zinc-950 p-2">
        {year} {month}
      </div>
      <button className="px-4" onClick={onChangeMonth('next')}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  )
}
