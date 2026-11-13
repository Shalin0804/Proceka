import { Link } from 'react-router-dom'
import Img from './Img'

export default function CollectionCard({ collection, index, className = '' }) {
  return (
    <article className={`ccard ${className}`}>
      <Link to={`/collections#${collection.slug}`} className="ccard__link" aria-label={`Explore ${collection.title}`}>
        <div className="ccard__media" data-reveal="image">
          <Img name={collection.image} alt={collection.gallery[0].alt} sizes="(max-width: 760px) 100vw, 50vw" />
        </div>
        <div className="ccard__body">
          <span className="ccard__index">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="ccard__title">{collection.title}</h3>
          <p className="ccard__text">{collection.short}</p>
          <span className="link-arrow">Explore Collection <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  )
}
