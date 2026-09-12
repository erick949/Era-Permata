import { useEffect, useState } from 'react'
import LiquidGlassPanel from '../LiquidGlass/LiquidGlassPanel'
import { navLinks } from '../../data/nav'
import useActiveSection from '../../hooks/useActiveSection'
import './navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <header className="navbar-shell">
      <LiquidGlassPanel
        as="nav"
        type="rounded"
        borderRadius={26}
        tintOpacity={0.14}
        className="navbar-glass"
        contentClassName="navbar-content"
        aria-label="Primary"
      >
        <a href="#home" className="navbar-brand" onClick={handleLinkClick}>
          Era Permata Sari
        </a>

        <ul className={`navbar-links ${menuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className={activeId === link.href.replace('#', '') ? 'is-active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="navbar-toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </LiquidGlassPanel>
    </header>
  )
}
