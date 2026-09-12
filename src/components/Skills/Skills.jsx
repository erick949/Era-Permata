import { skillGroups } from '../../data/skills'
import useReveal from '../../hooks/useReveal'
import './skills.css'

export default function Skills() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">Skills</p>
          <h2>What I bring to a set, and a screen.</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ group }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`skill-card reveal ${visible ? 'is-visible' : ''}`}>
      <h3>{group.title}</h3>
      <p>{group.blurb}</p>
      <ul>
        {group.skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}
