import { useEffect } from 'react'
import { Container } from '../lib/liquid-glass/container'

/**
 * liquid-glass-js snapshots the page ONCE (via html2canvas) the first time a
 * Container mounts, then every glass surface samples that single static
 * image. That's fine at rest, but a resize (or orientation change) changes
 * what's actually behind the glass, so we take one fresh snapshot after
 * resizing settles down. Mount this once near the app root.
 */
export default function useLiquidGlassRecapture() {
  useEffect(() => {
    let timeoutId = null

    const scheduleRecapture = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        Container.recapture()
      }, 400)
    }

    window.addEventListener('resize', scheduleRecapture)
    window.addEventListener('orientationchange', scheduleRecapture)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', scheduleRecapture)
      window.removeEventListener('orientationchange', scheduleRecapture)
    }
  }, [])
}
