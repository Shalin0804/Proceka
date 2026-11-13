import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Img from '../components/Img'
import MagneticButton from '../components/MagneticButton'
import CollectionCard from '../components/CollectionCard'
import CTASection from '../components/CTASection'
import { collections } from '../data/collections'
import { applications, reasons, company } from '../data/site'
import { useScrollAnimations, gsap, ScrollTrigger, timing } from '../animations/gsap'

const STORY_BG = ['#1D1D1B', '#14292C', '#26231F', '#1B2226', '#2A2520', '#0E2C30']

export default function Home() {
  const ref = useScrollAnimations(({ reduced, root }) => {
    if (!reduced) {
      // Hero: frame opens from an inset, image settles from a slow zoom, then drifts on scroll.
      gsap.from('.hero__media', { clipPath: 'inset(14% 10% 14% 10%)', duration: 2, ease: 'expo.inOut', delay: Math.max(timing.heroDelay - 0.9, 0) })
      gsap.fromTo('.hero__media img', { scale: 1.3 }, { scale: 1.06, duration: 3.6, ease: 'power2.out', delay: Math.max(timing.heroDelay - 0.9, 0) })
      gsap.to('.hero__media', { yPercent: 22, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero__content', { yPercent: -30, autoAlpha: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: '30% top', end: 'bottom top', scrub: true } })
    }

    // Horizontal storytelling: pinned on desktop; on mobile / reduced motion the
    // track is a native swipeable scroller (CSS), so nothing is hijacked.
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const story = root.querySelector('.story')
      const track = story.querySelector('.story__track')
      story.classList.add('is-pinned')
      const distance = () => track.scrollWidth - window.innerWidth
      const scroll = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: { trigger: story, pin: true, scrub: 1, end: () => `+=${distance()}`, invalidateOnRefresh: true },
      })
      gsap.to(story.querySelector('.story__progress span'), {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: story, start: 'top top', end: () => `+=${distance()}`, scrub: true },
      })
      story.querySelectorAll('.story__panel').forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel, containerAnimation: scroll, start: 'left 60%', end: 'right 60%',
          onToggle: (self) => self.isActive && gsap.to(story, { backgroundColor: STORY_BG[i % STORY_BG.length], duration: 0.9, overwrite: true }),
        })
        const word = panel.querySelector('.story__word')
        if (word) gsap.fromTo(word, { xPercent: 25 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true } })
        const img = panel.querySelector('.story__media img')
        if (img) gsap.fromTo(img, { xPercent: -10, scale: 1.2 }, { xPercent: 10, ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left right', end: 'right left', scrub: true } })
        const media = panel.querySelector('.story__media')
        if (media) gsap.from(media, { clipPath: 'inset(0% 0% 0% 100%)', ease: 'none', scrollTrigger: { trigger: panel, containerAnimation: scroll, start: 'left 95%', end: 'left 45%', scrub: true } })
      })
      return () => story.classList.remove('is-pinned')
    })
    return () => mm.revert()
  })

  return (
    <div ref={ref}>
      <Seo
        title="Surfaces That Define Spaces"
        description="PORCEKA SURFACES LLP — architectural and decorative surface solutions: large format slabs, 60 × 120 cm tiles, mosaics, customised tiles and design-led surfaces for India and international markets."
      />

      {/* 1 — Hero */}
      <section className="hero" data-hero>
        <div className="hero__media">
          <Img name="hero" alt="Freestanding stone bath in a minimal textured stone interior" eager />
        </div>
        <div className="hero__shade" />
        <div className="container hero__content">
          <p className="label label--light" data-reveal="fade">A World of Surfaces. Endless Possibilities.</p>
          <h1 className="display display--hero" data-reveal="lines">
            Beyond Surfaces.<br /> <em>Beyond Imagination.</em>
          </h1>
          <div className="hero__foot" data-reveal="fade">
            <p className="hero__text">Discover a world where materials, textures and design come together to define extraordinary spaces.</p>
            <div className="btn-row">
              <MagneticButton to="/collections" variant="light">Explore Collections</MagneticButton>
              <MagneticButton to="/about" variant="ghost">Discover Porceka</MagneticButton>
            </div>
          </div>
        </div>
        <div className="hero__meta container" data-reveal="fade">
          <span>{company.statement}</span>
          <span className="hero__scroll" aria-hidden="true"><i /> Scroll</span>
        </div>
      </section>

      {/* 2 — Brand introduction */}
      <section className="section intro">
        <div className="container intro__grid">
          <div className="intro__media">
            <div className="intro__main" data-parallax="8">
              <Img name="stone-living" alt="Double-height living space with a stone-clad fireplace wall" sizes="(max-width: 900px) 100vw, 55vw" />
            </div>
            <div className="intro__inset" data-reveal="image">
              <Img name="marble-bath" alt="Veined marble wall with brass fittings" sizes="(max-width: 900px) 50vw, 22vw" />
            </div>
          </div>
          <div className="intro__copy">
            <p className="label" data-reveal="fade">01 — Welcome to Porceka</p>
            <h2 className="display" data-reveal="lines">Surfaces That Define Spaces.</h2>
            <div data-reveal="fade" data-stagger>
              <p className="lead">Welcome to Porceka Surfaces LLP — where design meets versatility and every surface opens up new possibilities.</p>
              <p>We bring together a comprehensive collection of architectural and decorative surface solutions, ranging from magnificent large-format slabs and contemporary 60 × 120 cm tiles to intricate mosaics and customised tile creations.</p>
              <p>Designed to cater to evolving architectural styles and individual design preferences, our portfolio offers possibilities for residential, commercial, hospitality and international projects.</p>
              <p className="intro__sign">Explore beyond the ordinary. <em>Discover Porceka.</em></p>
              <Link to="/about" className="link-arrow">Our story <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((k) => (
            <span key={k}>
              {collections.map((c) => <span key={c.slug}>{c.title}<i>✦</i></span>)}
            </span>
          ))}
        </div>
      </div>

      {/* 3 — Featured collections */}
      <section className="section featured" aria-labelledby="featured-title">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="fade">02 — Our Collections</p>
            <h2 id="featured-title" className="display" data-reveal="lines">A Complete World of Surface Solutions.</h2>
            <Link to="/collections" className="link-arrow section-head__link" data-reveal="fade">View all collections <span aria-hidden="true">→</span></Link>
          </header>
          <div className="featured__grid">
            {collections.map((c, i) => <CollectionCard key={c.slug} collection={c} index={i} className={`featured__card featured__card--${i + 1}`} />)}
          </div>
        </div>
      </section>

      {/* 4 — Visual storytelling (horizontal) */}
      <section className="story" aria-labelledby="story-title">
        <div className="story__progress" aria-hidden="true"><span /></div>
        <div className="story__track">
          <div className="story__panel story__panel--intro">
            <p className="label label--light">03 — The Surface Journey</p>
            <h2 id="story-title" className="display">One Destination.<br /><em>Every Surface Possibility.</em></h2>
            <p className="story__hint">Five ways to define a space <span aria-hidden="true">→</span></p>
          </div>
          {collections.map((c, i) => (
            <article className="story__panel" key={c.slug}>
              <span className="story__word" aria-hidden="true">{c.word}.</span>
              <div className="story__media">
                <Img name={c.image} alt={c.gallery[0].alt} sizes="(max-width: 900px) 80vw, 34vw" />
              </div>
              <div className="story__copy">
                <span className="story__index">{String(i + 1).padStart(2, '0')} / 05</span>
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <Link to={`/collections#${c.slug}`} className="link-arrow link-arrow--light">Explore <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5 — Applications */}
      <section className="section applications" aria-labelledby="apps-title">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="fade">04 — Applications</p>
            <h2 id="apps-title" className="display" data-reveal="lines">Surfaces for Every Kind of Space.</h2>
          </header>
          <div className="apps" data-reveal="fade" data-stagger>
            {applications.map((a, i) => (
              <article className="app" key={a.title} tabIndex={0}>
                <Img name={a.image} alt={a.alt} sizes="(max-width: 900px) 100vw, 40vw" />
                <div className="app__body">
                  <span className="app__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{a.title}</h3>
                  <ul>{a.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Why Porceka */}
      <section className="section why" aria-labelledby="why-title">
        <div className="container why__grid">
          <div className="why__head">
            <p className="label" data-reveal="fade">05 — Why Porceka?</p>
            <h2 id="why-title" className="display" data-reveal="lines">A Complete Surface Destination.</h2>
            <div className="why__img" data-reveal="image">
              <Img name="marble-grey" alt="Soft grey marble surface" sizes="(max-width: 900px) 100vw, 35vw" />
            </div>
          </div>
          <ol className="why__list" data-reveal="fade" data-stagger>
            {reasons.map((r, i) => (
              <li key={r.title}>
                <span className="why__num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — Final CTA */}
      <CTASection title="Let's Create Something Extraordinary." text="Looking for the perfect surface for your next project? Let's explore the possibilities together." button="Start Your Project" />
    </div>
  )
}
