import { MouseEvent, useEffect, useRef } from 'react'

export const useOutsideClick = <T extends HTMLElement>(
  callback: () => void,
  isConditional = false,
) => {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (isConditional) return

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener(
      'mousedown',
      handleClick as unknown as EventListener,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClick as unknown as EventListener,
      )
    }
  }, [callback, isConditional, ref])

  return ref
}
