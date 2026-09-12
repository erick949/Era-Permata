import { lazy, Suspense } from 'react'
import { profile } from '../../data/profile'
import './hero.css'

const Hero3D = lazy(() => import('../Hero3D/Hero3D'))

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-atmosphere" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="kicker">Multimedia Creator, Indonesia</p>
          <h1 className="hero-title">
            {profile.name}
          </h1>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-description">{profile.heroDescription}</p>

          <div className="hero-actions">
            <a href="#portfolio" className="btn btn-primary">
              View the portfolio
            </a>
            <a href="#contact" className="btn btn-secondary">
              Start a project
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <Suspense fallback={null}>
            <Hero3D />
          </Suspense>
        </div>
      </div>

      <a href="#about" className="hero-scroll" aria-label="Scroll to About section">
        <span className="hero-scroll-line" />
        Scroll
      </a>
    </section>
  )
}