import LiquidGlassPanel from '../LiquidGlass/LiquidGlassPanel'
import { services } from '../../data/services'
import useReveal from '../../hooks/useReveal'
import './services.css'

export default function Services() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="services" className="section services">
      <div className="services-atmosphere" aria-hidden="true" />
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">Services</p>
          <h2>What I can create for you.</h2>
          <p>Available for freelance and collaborative work — from a single shoot to an ongoing content partnership.</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
      <LiquidGlassPanel
        type="rounded"
        borderRadius={24}
        tintOpacity={0.2}
        className="service-card"
        contentClassName="service-card-content"
      >
        <h3>{service.title}</h3>
        <p className="service-description">{service.description}</p>
        <ul className="service-features">
          {service.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <a href="#contact" className="service-cta">
          Get in touch
        </a>
      </LiquidGlassPanel>
    </div>
  )
}
