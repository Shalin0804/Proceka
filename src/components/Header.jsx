import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import { InstagramIcon } from './Icons'
import { navigation, company, instagramHref } from '../data/site'
import { gsap, prefersReducedMotion } from '../animations/gsap'
import { getLenis } from '../hooks/useLenis'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const { pathname } = useLocation()

  // Transparent over the hero, solid once scrolled; slides away scrolling down, back on scroll up.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 300 && y > last)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const lenis = getLenis()
    document.documentElement.classList.toggle('menu-open', open)
    if (open) {
      lenis?.stop()
      if (!prefersReducedMotion()) {
        gsap.from(menuRef.current.querySelectorAll('.mobile-menu__link, .mobile-menu__meta > *'), {
          yPercent: 100, autoAlpha: 0, stagger: 0.06, duration: 0.9, ease: 'expo.out', delay: 0.15,
        })
      }
    } else lenis?.start()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const cls = ['site-header', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open'].filter(Boolean).join(' ')

  return (
    <header className={cls}>
      <div className="container site-header__bar">
        <Link to="/" className="site-header__logo" aria-label="Porceka Surfaces — home">
          <Logo />
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end className="site-nav__link">
              <span data-text={item.label}>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <MagneticButton to="/contact" variant="outline" className="site-header__cta">Start a Project</MagneticButton>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} strokeWidth={1.3} /> : <Menu size={26} strokeWidth={1.3} />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" ref={menuRef} hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {navigation.map((item, i) => (
            <div key={item.to} className="mobile-menu__row">
              <NavLink to={item.to} end className="mobile-menu__link">
                <small>{String(i + 1).padStart(2, '0')}</small>
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="mobile-menu__meta">
          <p className="label label--light">{company.location}</p>
          <a href={instagramHref} target="_blank" rel="noopener noreferrer" className="mobile-menu__ig">
            <InstagramIcon /> {company.instagramName}
          </a>
          <p className="mobile-menu__tag">{company.tagline}</p>
        </div>
      </div>
    </header>
  )
}
