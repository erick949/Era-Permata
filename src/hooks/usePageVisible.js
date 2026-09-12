import { useEffect, useState } from 'react'

/**
 * Tracks document.visibilityState so any expensive work (the R3F render
 * loop, in our case) can pause when the tab isn't visible.
 */
export default function usePageVisible() {
  const [visible, setVisible] = useState(
    () => typeof document !== 'undefined' && document.visibilityState === 'visible'
  )

  useEffect(() => {
    const handleChange = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleChange)
    return () => document.removeEventListener('visibilitychange', handleChange)
  }, [])

  return visible
}
