import { featuredProjects } from '../../data/projects'
import useReveal from '../../hooks/useReveal'
import './projects.css'

export default function Projects() {
  const [headRef, headVisible] = useReveal()

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">Featured Projects</p>
          <h2>A closer look at select work.</h2>
        </div>

        <div className="projects-list">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectRow({ project }) {
  const [ref, visible] = useReveal()
  return (
    <article ref={ref} className={`project-row reveal ${visible ? 'is-visible' : ''}`}>
      <div className="project-visual">
        <span className="project-visual-label">{project.category}</span>
      </div>
      <div className="project-info">
        <span className="project-category">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <dl className="project-meta">
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd>{project.tools.join(' · ')}</dd>
          </div>
        </dl>
        {project.link && (
          <a href={project.link} className="project-link">
            View project
          </a>
        )}
      </div>
    </article>
  )
}
