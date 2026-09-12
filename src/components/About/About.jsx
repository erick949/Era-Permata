import { profile, languages } from '../../data/profile'
import useReveal from '../../hooks/useReveal'
import './about.css'

export default function About() {
  const [headRef, headVisible] = useReveal()
  const [bodyRef, bodyVisible] = useReveal()

  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div ref={headRef} className={`about-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">About</p>
          <h2>Behind the shot, and in front of it.</h2>
        </div>

        <div ref={bodyRef} className={`about-body reveal ${bodyVisible ? 'is-visible' : ''}`}>
          {profile.aboutParagraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          <ul className="about-languages">
            {languages.map((lang) => (
              <li key={lang.name}>
                <span className="about-language-name">{lang.name}</span>
                <span className="about-language-level">{lang.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
