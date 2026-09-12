import { useEffect, useRef } from 'react'
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion'
import usePageVisible from '../../hooks/usePageVisible'
import './hero3d.css'

export default function Hero3D({ bleed = false }) {
  const videoRef = useRef(null)
  const reducedMotion = usePrefersReducedMotion()
  const visible = usePageVisible()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (reducedMotion || !visible) {
      video.pause()
    } else {
      video.play().catch(() => {})
    }
  }, [reducedMotion, visible])

  return (
    <div className={`hero3d${bleed ? ' hero3d--bleed' : ''}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="hero3d-video"
        poster="/video_fotografia-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/video_fotografia.webm" type="video/webm" />
        <source src="/video_fotografia.mp4" type="video/mp4" />
      </video>
    </div>
  )
}