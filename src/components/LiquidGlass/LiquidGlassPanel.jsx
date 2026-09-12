import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Container } from '../../lib/liquid-glass/container'
import '../../lib/liquid-glass/glass.css'
import './liquid-glass-panel.css'

export default function LiquidGlassPanel({
  as: Tag = 'div',
  type = 'rounded', // 'rounded' | 'circle' | 'pill'
  borderRadius = 28,
  tintOpacity = 0.16,
  className = '',
  contentClassName = '',
  style,
  children,
  ...rest
}) {
  const hostRef = useRef(null)
  const [portalTarget, setPortalTarget] = useState(null)

  useEffect(() => {
    const container = new Container({ type, borderRadius, tintOpacity })

    const contentEl = document.createElement('div')
    contentEl.className = `lg-content ${contentClassName}`.trim()
    container.element.appendChild(contentEl)

    if (hostRef.current) {
      hostRef.current.appendChild(container.element)
    }


    if (!container.gl && container.canvas) {
      container.canvas.dataset.glFailed = 'true'
    }

    const ro = new ResizeObserver(() => container.updateSizeFromDOM())
    ro.observe(container.element)

    const raf = requestAnimationFrame(() => container.updateSizeFromDOM())
    setPortalTarget(contentEl)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      container.destroy()
      setPortalTarget(null)
    }
  }, [type, borderRadius, tintOpacity])

  return (
    <Tag ref={hostRef} className={`lg-host ${className}`.trim()} style={style} {...rest}>
      {portalTarget && createPortal(children, portalTarget)}
    </Tag>
  )
}
