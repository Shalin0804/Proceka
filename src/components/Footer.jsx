import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { InstagramIcon } from './Icons'
import { company, navigation, instagramHref, isPlaceholder } from '../data/site'
import { collections } from '../data/collections'
import { scrollToTarget } from '../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Logo className="logo--large" />
            <p className="site-footer__signature">{company.signature}</p>
          </div>
          <p className="site-footer__tagline">
            {company.tagline}
            <em>{company.statement}</em>
          </p>
        </div>

        <div className="site-footer__grid">
          <div>
            <h2 className="site-footer__heading">Navigate</h2>
            <ul>
              {navigation.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer__heading">Collections</h2>
            <ul>
              {collections.map((c) => (
                <li key={c.slug}><Link to={`/collections#${c.slug}`}>{c.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="site-footer__heading">Contact</h2>
            <ul>
              <li>{company.location}</li>
              <li>{isPlaceholder(company.email) ? company.email : <a href={`mailto:${company.email}`}>{company.email}</a>}</li>
              <li>{isPlaceholder(company.phone) ? company.phone : <a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a>}</li>
            </ul>
          </div>
          <div>
            <h2 className="site-footer__heading">Follow</h2>
            <a className="site-footer__ig" href={instagramHref} target="_blank" rel="noopener noreferrer">
              <InstagramIcon /> {company.instagramName} <ArrowUpRight size={15} strokeWidth={1.5} />
            </a>
            <Link to="/contact" className="site-footer__cta">Start your project <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <button type="button" className="site-footer__top-btn" onClick={() => scrollToTarget(0)}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  )
}
