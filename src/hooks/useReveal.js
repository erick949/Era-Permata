import { useEffect, useRef, useState } from 'react'
import usePrefersReducedMotion from './usePrefersReducedMotion'

/**
 * Returns a ref + boolean. Attach the ref to any element; `revealed`
 * flips to true once the element scrolls into view, and stays true
 * (one-shot reveal, not a repeating scroll-jank animation).
 *
 * Respects prefers-reduced-motion by starting (and staying) revealed,
 * so reduced-motion users never see a fade/slide transition at all.
 */
export default function useReveal({ threshold = 0.2, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const [intersected, setIntersected] = useState(false)

  useEffect(() => {
    if (reducedMotion) return undefined // handled by the derived value below

    const el = ref.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersected(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reducedMotion, threshold, rootMargin])

  // Derived at render time (not via a synchronizing setState-in-effect):
  // reduced-motion users always see content already revealed, live toggles
  // of the OS setting included.
  return [ref, reducedMotion || intersected]
}
