import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { InstagramIcon } from './Icons'
import { company, navigation, instagramHref, emailHref, telHref, mapsHref } from '../data/site'
import { collections } from '../data/collections'
import { scrollToTarget } from '../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <p className="site-footer__name">{company.name}</p>
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
              {company.phones.map((p) => <li key={p.tel}><a href={telHref(p)}>{p.display}</a></li>)}
              <li><a href={emailHref}>{company.email}</a></li>
              <li>
                <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="site-footer__address">
                  {company.address.join(' ')}
                </a>
              </li>
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
