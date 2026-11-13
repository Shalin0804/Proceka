import Seo from '../components/Seo'
import Img from '../components/Img'
import PageHero from '../components/PageHero'
import CTASection from '../components/CTASection'
import { useScrollAnimations, gsap } from '../animations/gsap'

const STAGES = [
  { image: 'empty-space', alt: 'An empty, light-filled architectural space', step: 'The Space', title: 'Every space begins as a blank canvas.', text: 'Light, volume and proportion — waiting for the material that will give it character.' },
  { image: 'marble-grey', alt: 'Close-up of a grey marble surface', step: 'The Surface', title: 'The right surface is chosen with intent.', text: 'Formats, textures, colours and finishes are explored until the material matches the vision.' },
  { image: 'marble-bath', alt: 'Finished interior with a veined marble wall and brass details', step: 'The Space, Defined', title: 'And the ordinary becomes extraordinary.', text: 'The right surface transforms a room into a space with identity.' },
]

const VALUES = [
  { title: 'Quality First', text: 'A commitment to high-grade surfaces, whether sourced in India or internationally.' },
  { title: 'Reliability', text: 'Dependable service, transparent communication and follow-through on every enquiry.' },
  { title: 'Partnership', text: 'Long-term relationships with manufacturers, builders, architects and designers.' },
  { title: 'Innovation', text: 'Constantly exploring new designs, formats, technologies and sustainable practices.' },
  { title: 'Integrity', text: 'Ethical business conduct and a commitment to fairness in every dealing.' },
]

const APPROACH = [
  { title: 'Explore', text: 'A destination for exploring diverse materials, formats, textures and finishes — from large architectural statements to intricate decorative details.' },
  { title: 'Customise', text: 'Where a standard collection is not enough, we explore individual dimensions, patterns, colours and creative concepts.' },
  { title: 'Collaborate', text: 'Working alongside architects, interior designers, developers, dealers and homeowners to make every design vision possible.' },
]

export default function About() {
  const ref = useScrollAnimations(({ root }) => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const section = root.querySelector('.transform')
      section.classList.add('is-pinned')
      const layers = section.querySelectorAll('.transform__layer')
      const captions = section.querySelectorAll('.transform__caption')
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: '+=220%', pin: true, scrub: 1 },
      })
      gsap.set(captions, { autoAlpha: (i) => (i === 0 ? 1 : 0) })
      tl.to(layers[0].querySelector('img'), { scale: 1.15, duration: 2 }, 0)
      ;[1, 2].forEach((i) => {
        const at = (i - 1) * 1 + 0.3
        tl.fromTo(layers[i], { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7 }, at)
          .fromTo(layers[i].querySelector('img'), { scale: 1.35 }, { scale: 1.05, duration: 1 }, at)
          .to(captions[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 }, at)
          .fromTo(captions[i], { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.35)
          .to(section.querySelector('.transform__bar span'), { scaleY: (i + 1) / 3, duration: 0.7 }, at)
      })
      return () => section.classList.remove('is-pinned')
    })
    return () => mm.revert()
  })

  return (
    <div ref={ref}>
      <Seo
        title="About Us"
        description="Beyond tiles, into the world of surfaces. Discover the philosophy, vision and approach behind PORCEKA SURFACES LLP, Mumbai."
      />
      <PageHero
        label="About Porceka"
        title="Beyond Tiles. Into the World of Surfaces."
        image="architecture"
        alt="Angular contemporary architecture rising against a pale sky"
        tall
      />

      {/* 1 — About */}
      <section className="section about-intro">
        <div className="container about-intro__grid">
          <p className="label" data-reveal="fade">01 — About Porceka</p>
          <h2 className="display about-intro__statement" data-reveal="lines">
            At Porceka Surfaces LLP, we believe that every space deserves a surface that reflects its identity.
          </h2>
          <div className="about-intro__cols" data-reveal="fade" data-stagger>
            <p>We bring together an extensive range of products and surface possibilities, offering architects, interior designers, developers, dealers and homeowners a destination for exploring diverse materials, formats, textures and finishes.</p>
            <p>From large architectural statements to intricate decorative details, Porceka aims to make every design vision possible.</p>
          </div>
          <div className="about-intro__img" data-parallax="10">
            <Img name="villa" alt="Contemporary villa with a pool and clean architectural lines" sizes="(max-width: 900px) 100vw, 60vw" />
          </div>
        </div>
      </section>

      {/* 2 — Philosophy */}
      <section className="section philosophy">
        <div className="container philosophy__grid">
          <div className="philosophy__img" data-reveal="image">
            <Img name="marble-black" alt="Black marble with fine white veining" sizes="(max-width: 900px) 100vw, 40vw" />
          </div>
          <div>
            <p className="label label--light" data-reveal="fade">02 — Our Philosophy</p>
            <blockquote className="philosophy__quote" data-reveal="lines">
              “The right surface can transform an ordinary space into something extraordinary.”
            </blockquote>
            <p className="philosophy__text" data-reveal="fade">Our approach is driven by design, versatility and that belief. Surfaces are not a finishing touch — they are what gives a space its identity.</p>
          </div>
        </div>
      </section>

      {/* Scroll storytelling — space → surface → defined */}
      <section className="transform" aria-label="How surfaces define spaces">
        <div className="transform__stage">
          {STAGES.map((s, i) => (
            <figure className="transform__layer" key={s.image}>
              <Img name={s.image} alt={s.alt} sizes="100vw" />
              <figcaption className="transform__mobile-cap container">
                <span className="label label--light">{String(i + 1).padStart(2, '0')} — {s.step}</span>
                <strong>{s.title}</strong>
              </figcaption>
            </figure>
          ))}
          <div className="transform__shade" />
          <div className="container transform__captions">
            {STAGES.map((s, i) => (
              <div className="transform__caption" key={s.step}>
                <span className="label label--light">{String(i + 1).padStart(2, '0')} — {s.step}</span>
                <h2 className="display">{s.title}</h2>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
          <div className="transform__bar" aria-hidden="true"><span /></div>
        </div>
      </section>

      {/* 3 + 4 — Vision & Mission */}
      <section className="section vm">
        <div className="container vm__grid">
          <article className="vm__item">
            <p className="label" data-reveal="fade">03 — Our Vision</p>
            <h2 className="display" data-reveal="lines">To become a trusted name in surfaces across India and international markets.</h2>
            <p data-reveal="fade">Known for quality, reliability and design excellence — connecting design possibilities with spaces across the world.</p>
          </article>
          <article className="vm__item">
            <p className="label" data-reveal="fade">04 — Our Mission</p>
            <ul className="vm__list" data-reveal="fade" data-stagger>
              <li>To offer a curated portfolio of surfaces sourced from national and global manufacturers.</li>
              <li>To serve retail and project customers alike — from a single residence to large developments.</li>
              <li>To connect Indian and globally sourced surfaces with international buyers.</li>
              <li>To operate responsibly, promote ethical business practices and support design innovation.</li>
            </ul>
          </article>
        </div>
      </section>

      {/* 5 — Values */}
      <section className="section values">
        <div className="container">
          <header className="section-head">
            <p className="label" data-reveal="fade">05 — Our Values</p>
            <h2 className="display" data-reveal="lines">What every surface stands on.</h2>
          </header>
          <div className="values__grid" data-reveal="fade" data-stagger>
            {VALUES.map((v, i) => (
              <article key={v.title} className="values__item">
                <span className="values__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Approach */}
      <section className="section approach">
        <div className="container approach__grid">
          <div className="approach__head">
            <p className="label" data-reveal="fade">06 — Our Approach</p>
            <h2 className="display" data-reveal="lines">Design-led. Versatile. Open to possibility.</h2>
            <div className="approach__img" data-reveal="image">
              <Img name="architect" alt="Architect working over drawings at a desk" sizes="(max-width: 900px) 100vw, 40vw" />
            </div>
          </div>
          <ol className="approach__steps" data-reveal="fade" data-stagger>
            {APPROACH.map((a, i) => (
              <li key={a.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — Markets */}
      <section className="section markets">
        <div className="container">
          <header className="section-head section-head--center">
            <p className="label label--light" data-reveal="fade">07 — Domestic & International</p>
            <h2 className="display" data-reveal="lines">From Mumbai, to spaces across the world.</h2>
            <p className="section-head__text" data-reveal="fade">With a focus on the Indian and international markets, we aspire to connect design possibilities with spaces across the world.</p>
          </header>
          <div className="markets__grid" data-reveal="fade" data-stagger>
            <article>
              <h3>India</h3>
              <p>Serving homeowners, interior designers, architects, dealers, real-estate developers and construction firms — for retail requirements and projects alike.</p>
            </article>
            <article>
              <h3>International</h3>
              <p>Looking ahead to importers, overseas buyers and design professionals in markets such as the Middle East, Africa, Southeast Asia and beyond.</p>
            </article>
          </div>
        </div>
      </section>

      {/* 8 — CTA */}
      <CTASection title="Let's Create Something Extraordinary." text="Tell us about your space — we'll explore the surfaces that define it." button="Start Your Project" image="stone-wall" />
    </div>
  )
}
