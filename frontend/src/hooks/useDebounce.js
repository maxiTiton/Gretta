/**
 * useDebounce Hook
 * Custom hook para debouncing (útil en búsquedas)
 * 
 * TODO: Implementar:
 * - Recibir value y delay
 * - Retornar valor debounced
 * - Cleanup en unmount
 */

import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
