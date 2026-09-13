import { useMemo, useState } from 'react'
import { portfolioFilters, portfolioItems } from '../../data/portfolio'
import { CameraIcon, EditIcon, SocialIcon, SparkIcon, VideoIcon } from '../common/icons'
import useReveal from '../../hooks/useReveal'
import './portfolio.css'

const categoryIcons = {
  Photography: CameraIcon,
  Video: VideoIcon,
  Editing: EditIcon,
  'Social Media': SocialIcon,
  'Personal Projects': SparkIcon,
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [headRef, headVisible] = useReveal()

  const filteredItems = useMemo(
    () => (activeFilter === 'All' ? portfolioItems : portfolioItems.filter((item) => item.category === activeFilter)),
    [activeFilter]
  )

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <div ref={headRef} className={`section-head reveal ${headVisible ? 'is-visible' : ''}`}>
          <p className="kicker">Portfolio</p>
          <h2>A working gallery, built to grow.</h2>
          <p>
            Filter by discipline to see how the work is organized. Real photography, edits, and campaigns drop
            straight into these slots.
          </p>
        </div>

        <div className="portfolio-filters" role="tablist" aria-label="Filter portfolio by category">
          {portfolioFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter}
              className={`portfolio-filter ${activeFilter === filter ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <PortfolioTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PortfolioTile({ item }) {
  const Icon = categoryIcons[item.category] || SparkIcon
  return (
    <figure className={`portfolio-tile portfolio-tile-${item.size}`}>
      {item.image ? (
        <div className="portfolio-tile-media">
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
      ) : (
        <div className="portfolio-tile-placeholder">
          <Icon className="portfolio-tile-icon" />
        </div>
      )}
      <figcaption>
        <span className="portfolio-tile-category">{item.category}</span>
        <span className="portfolio-tile-title">{item.title}</span>
      </figcaption>
    </figure>
  )
}