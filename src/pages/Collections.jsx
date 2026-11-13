import { useLayoutEffect, useRef, useState } from 'react'
import { Expand } from 'lucide-react'
import Seo from '../components/Seo'
import Img from '../components/Img'
import MagneticButton from '../components/MagneticButton'
import EnquiryForm from '../components/EnquiryForm'
import Lightbox from '../components/Lightbox'
import CTASection from '../components/CTASection'
import { collections } from '../data/collections'
import { projectTypes } from '../data/site'
import { useScrollAnimations, gsap, ScrollTrigger, Flip, prefersReducedMotion, timing } from '../animations/gsap'
import { scrollToTarget } from '../hooks/useLenis'

const LIBRARY = collections.flatMap((c) => c.gallery.map((g) => ({ ...g, slug: c.slug, caption: c.title })))

const STUDIO_FIELDS = [
  { name: 'name', label: 'Full Name', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel' },
  { name: 'projectType', label: 'Project Type', type: 'select', options: projectTypes, required: true },
  { name: 'surface', label: 'Surface Requirement', type: 'select', options: [...collections.map((c) => c.title), 'Not sure yet'], required: true, full: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
]

export default function Collections() {
  const [active, setActive] = useState(collections[0].slug)
  const [filter, setFilter] = useState('all')
  const [lightbox, setLightbox] = useState({ items: LIBRARY, index: null })
  const [preset, setPreset] = useState(null)
  const flipState = useRef(null)

  const ref = useScrollAnimations(({ reduced, root }) => {
    if (!reduced) {
      gsap.from('.chero__panel', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.6, stagger: 0.15, ease: 'expo.inOut', delay: timing.heroDelay })
      root.querySelectorAll('.chero__panel').forEach((p, i) => {
        gsap.to(p, { yPercent: [-12, 8, -20][i], ease: 'none', scrollTrigger: { trigger: '.chero', start: 'top top', end: 'bottom top', scrub: true } })
      })
    }
    root.querySelectorAll('.collection').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 55%', end: 'bottom 55%', onToggle: (self) => setActive((a) => (self.isActive ? el.id : a === el.id ? null : a)) })
    })
  })

  // Smooth re-layout of the surface library when the filter changes.
  const changeFilter = (next) => {
    if (next === filter) return
    flipState.current = Flip.getState('.library__item')
    setFilter(next)
  }
  useLayoutEffect(() => {
    if (!flipState.current) return
    const state = flipState.current
    flipState.current = null
    if (prefersReducedMotion()) return
    Flip.from(state, {
      duration: 0.8,
      ease: 'expo.inOut',
      scale: true,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.7, delay: 0.2 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.9, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }, [filter])

  const visible = LIBRARY.filter((i) => filter === 'all' || i.slug === filter)
  const openLibrary = (item) => setLightbox({ items: visible, index: visible.indexOf(item) })
  const openCollection = (c, i) => setLightbox({ items: c.gallery.map((g) => ({ ...g, caption: c.title })), index: i })
  const enquire = (c) => {
    setPreset({ surface: c.title })
    scrollToTarget('#studio')
  }

  return (
    <div ref={ref}>
      <Seo
        title="Collections"
        description="Explore Porceka's surface collections: large format slabs, 60 × 120 cm tiles, mosaics, customised tiles and decorative, design-led surfaces."
      />

      {/* 1 — Hero */}
      <section className="chero" data-hero>
        <div className="container chero__grid">
          <div className="chero__copy">
            <p className="label label--light" data-reveal="fade">Discover the Art of Surfaces</p>
            <h1 className="display display--hero" data-reveal="lines">Explore Surfaces.<br /><em>Experience Possibilities.</em></h1>
            <p className="chero__text" data-reveal="fade">A complete world of surface solutions — five collections, countless ways to define a space.</p>
          </div>
          <div className="chero__panels" aria-hidden="true">
            {['slabs', 'mosaic-kitchen', 'marble-black'].map((img) => (
              <div className="chero__panel" key={img}><Img name={img} alt="" eager sizes="(max-width: 900px) 33vw, 18vw" /></div>
            ))}
          </div>
        </div>
        <ol className="container chero__index" data-reveal="fade" data-stagger>
          {collections.map((c, i) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} onClick={(e) => { e.preventDefault(); scrollToTarget(`#${c.slug}`) }}>
                <span>{String(i + 1).padStart(2, '0')}</span>{c.title}
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Category navigation */}
      <nav className="catnav" aria-label="Collections">
        <div className="container catnav__inner">
          {collections.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className={`catnav__link ${active === c.slug ? 'is-active' : ''}`}
              aria-current={active === c.slug ? 'true' : undefined}
              onClick={(e) => { e.preventDefault(); scrollToTarget(`#${c.slug}`) }}
            >
              {c.title}
            </a>
          ))}
        </div>
      </nav>

      <section className="section collections-intro">
        <div className="container">
          <p className="label" data-reveal="fade">Our Collections</p>
          <h2 className="display collections-intro__title" data-reveal="lines">A Complete World of Surface Solutions — curated for architects, designers, developers and the spaces they imagine.</h2>
        </div>
      </section>

      {/* 2 — Collections */}
      {collections.map((c, i) => (
        <section id={c.slug} key={c.slug} className={`collection ${i % 2 ? 'collection--alt' : ''}`} aria-labelledby={`${c.slug}-title`}>
          <div className="container collection__grid">
            <header className="collection__head">
              <span className="collection__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <p className="label" data-reveal="fade">Collection {String(i + 1).padStart(2, '0')} / 05</p>
              <h2 id={`${c.slug}-title`} className="display" data-reveal="lines">{c.title}</h2>
              <div data-reveal="fade" data-stagger>
                <p className="lead">{c.description}</p>
                <p>{c.detail}</p>
                <ul className="tags" aria-label="Suited to">
                  {c.uses.map((u) => <li key={u}>{u}</li>)}
                </ul>
                <div className="btn-row">
                  <MagneticButton onClick={() => enquire(c)}>Enquire</MagneticButton>
                  <button type="button" className="link-arrow" onClick={() => openCollection(c, 0)}>View gallery <span aria-hidden="true">→</span></button>
                </div>
              </div>
            </header>
            <div className="collection__gallery">
              {c.gallery.map((g, gi) => (
                <button
                  type="button"
                  key={g.image}
                  className={`gimg gimg--${gi + 1}`}
                  onClick={() => openCollection(c, gi)}
                  aria-label={`Open full-screen: ${g.alt}`}
                  data-reveal="image"
                >
                  <Img name={g.image} alt={g.alt} sizes={gi === 0 ? '(max-width: 900px) 100vw, 45vw' : '(max-width: 900px) 50vw, 25vw'} />
                  <span className="gimg__hint" aria-hidden="true"><Expand size={16} strokeWidth={1.4} /> View</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 3 — Surface library */}
      <section className="section library" aria-labelledby="library-title">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="fade">The Surface Library</p>
            <h2 id="library-title" className="display" data-reveal="lines">See surfaces in their spaces.</h2>
          </header>
          <div className="library__filters" role="group" aria-label="Filter by collection">
            {[{ slug: 'all', title: 'All Surfaces' }, ...collections].map((c) => (
              <button key={c.slug} type="button" className={`chip ${filter === c.slug ? 'is-active' : ''}`} aria-pressed={filter === c.slug} onClick={() => changeFilter(c.slug)}>
                {c.title}
              </button>
            ))}
          </div>
          <div className="library__grid">
            {LIBRARY.map((item) => {
              const shown = filter === 'all' || item.slug === filter
              return (
                <button
                  type="button"
                  key={`${item.slug}-${item.image}`}
                  className="library__item gimg"
                  style={shown ? undefined : { display: 'none' }}
                  onClick={() => openLibrary(item)}
                  aria-label={`Open full-screen: ${item.alt}`}
                >
                  <Img name={item.image} alt={item.alt} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  <span className="library__caption">{item.caption}</span>
                </button>
              )
            })}
          </div>
          <p className="library__note">Imagery shown is representative of applications and finishes. Contact us for the current range.</p>
        </div>
      </section>

      {/* 4 — Customisation studio */}
      <section id="studio" className="section studio" aria-labelledby="studio-title">
        <div className="container studio__grid">
          <div className="studio__copy">
            <p className="label label--light" data-reveal="fade">Customisation Studio</p>
            <h2 id="studio-title" className="display" data-reveal="lines">Your Imagination. <em>Our Surface Possibilities.</em></h2>
            <div data-reveal="fade" data-stagger>
              <p className="lead">Not every vision fits into a standard collection. Let's explore what can be created together.</p>
              <p>Our customised solutions aim to cater to unique project requirements, allowing customers and design professionals to explore individual dimensions, patterns, colours and creative concepts.</p>
              <p>Whether it is a distinctive feature wall, a decorative installation or a project-specific surface requirement — let's create something unique.</p>
            </div>
          </div>
          <EnquiryForm formName="customisation-studio" fields={STUDIO_FIELDS} submitLabel="Discuss Your Custom Project" preset={preset} tone="dark" />
        </div>
      </section>

      {/* 5 — CTA */}
      <CTASection title="Have a Unique Project in Mind?" text="Connect with Porceka to explore our collections and discuss customised requirements." button="Contact Our Team" image="marble-grey" />

      <Lightbox items={lightbox.items} index={lightbox.index} onChange={(index) => setLightbox((l) => ({ ...l, index }))} />
    </div>
  )
}
