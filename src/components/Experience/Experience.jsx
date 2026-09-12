import { experienceItems } from '../../data/experience'
import useReveal from '../../hooks/useReveal'
import './experience.css'

export default function Experience() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="experience" className="section experience">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">Experience</p>
          <h2>Where the work has taken shape.</h2>
        </div>

        <ol className="experience-timeline">
          {experienceItems.map((item) => (
            <ExperienceRow key={item.id} item={item} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function ExperienceRow({ item }) {
  const [ref, visible] = useReveal()
  return (
    <li ref={ref} className={`experience-row reveal ${visible ? 'is-visible' : ''}`}>
      <div className="experience-marker" aria-hidden="true" />
      <span className="experience-period">{item.period}</span>
      <div className="experience-body">
        <span className="experience-area">{item.area}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </li>
  )
}
