import { useEffect, useRef } from 'react'

/**
 * Tracks pointer position as normalized [-1, 1] coordinates in a ref
 * (not state, since it updates on every mousemove and is only read inside
 * an animation frame — putting it in React state would cause a re-render
 * per pixel of mouse movement).
 *
 * Only listens on fine-pointer (mouse/trackpad) devices, since touch
 * screens don't have a meaningful "hover" position and the brief asks to
 * skip the mouse-reaction on mobile/touch.
 */
export default function usePointerNormalized() {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!isFinePointer) return undefined

    const handleMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return pointer
}
