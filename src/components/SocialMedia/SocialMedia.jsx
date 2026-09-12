import LiquidGlassPanel from '../LiquidGlass/LiquidGlassPanel'
import { socialLinks } from '../../data/social'
import useReveal from '../../hooks/useReveal'
import './social-media.css'

export default function SocialMedia() {
  const [ref, visible] = useReveal()

  return (
    <section id="social" className="section social-media">
      <div className="container">
        <div className={`social-media-inner reveal ${visible ? 'is-visible' : ''}`} ref={ref}>
          <div className="social-media-copy">
            <p className="kicker">Social Media</p>
            <h2>Follow the work as it happens.</h2>
            <p>Channels are being connected here as they go live.</p>
          </div>

          <LiquidGlassPanel
            type="pill"
            tintOpacity={0.18}
            className="social-dock"
            contentClassName="social-dock-content"
          >
            {socialLinks.map((link) =>
              link.href ? (
                <a key={link.id} href={link.href} target="_blank" rel="noreferrer" className="social-link">
                  {link.label}
                </a>
              ) : (
                <span key={link.id} className="social-link is-disabled" aria-disabled="true">
                  {link.label}
                </span>
              )
            )}
          </LiquidGlassPanel>
        </div>
      </div>
    </section>
  )
}
