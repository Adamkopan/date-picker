import { ForwardedRef, forwardRef } from 'react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ClearDatesButtonI {
  id?: string
  testId?: string
  name?: string
  onClick: () => void
}

export const ClearDatesButton = forwardRef(
  (
    { onClick, id, testId, name }: ClearDatesButtonI,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      ref={ref}
      className="bg-white border border-gray-300 text-gray-800 py-2 px-5 ml-0.5 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
      type="button"
      onClick={onClick}
      id={id}
      data-testid={testId}
      name={name}
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  ),
)
