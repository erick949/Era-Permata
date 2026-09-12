import { useCallback, useSyncExternalStore } from 'react'

/**
 * Subscribes to a media query via useSyncExternalStore — the idiomatic way
 * to read a browser API that can change outside of React (matchMedia's own
 * 'change' event), rather than useState+useEffect mirroring it.
 */
export default function useMediaQuery(query) {
  const subscribe = useCallback(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    [query]
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
