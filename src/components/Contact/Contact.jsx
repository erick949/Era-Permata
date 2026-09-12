import { useState } from 'react'
import LiquidGlassPanel from '../LiquidGlass/LiquidGlassPanel'
import { profile } from '../../data/profile'
import useReveal from '../../hooks/useReveal'
import './contact.css'

const FORM_ENDPOINT = 'https://formspree.io/f/xbgjbvnw'

export default function Contact() {
  const [ref, visible] = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid" ref={ref}>
        <div className={`contact-copy reveal ${visible ? 'is-visible' : ''}`}>
          <p className="kicker">Contact</p>
          <h2>Let's work on something together.</h2>
          <p>
            {profile.availability}. Tell me a little about the project — the format, the timeline, and what you're
            hoping it does once it's out in the world.
          </p>
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="contact-email">
              {profile.email}
            </a>
          )}
        </div>

        <LiquidGlassPanel
          type="rounded"
          borderRadius={24}
          tintOpacity={0.2}
          className={`contact-form-panel reveal ${visible ? 'is-visible' : ''}`}
          contentClassName="contact-form-content"
        >
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" required value={form.name} onChange={handleChange('name')} />
            </label>
            <label>
              Email
              <input type="email" required value={form.email} onChange={handleChange('email')} />
            </label>
            <label>
              Message
              <textarea rows={4} required value={form.message} onChange={handleChange('message')} />
            </label>
            <button type="submit" className="btn btn-primary contact-submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'sent' && <p className="contact-status">Thanks — your message is on its way.</p>}
            {status === 'error' && (
              <p className="contact-status">Something went wrong. Try again, or email me directly.</p>
            )}
          </form>
        </LiquidGlassPanel>
      </div>
    </section>
  )
}