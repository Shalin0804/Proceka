import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion, timing } from '../animations/gsap'

// First load: a preloader (wordmark draws in, then the panel lifts).
// Every later route change: the same panel wipes up off the new page — the page transition.
export default function Curtain() {
  const ref = useRef(null)
  const first = useRef(true)
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const el = ref.current
    if (prefersReducedMotion()) {
      timing.heroDelay = 0
      gsap.set(el, { autoAlpha: 0 })
      return
    }
    const isFirst = first.current
    first.current = false
    timing.heroDelay = isFirst ? 2.3 : 0.5
    const letters = el.querySelectorAll('.curtain__letter')
    const tl = gsap.timeline()
    tl.set(el, { autoAlpha: 1, yPercent: 0 })
    if (isFirst) {
      tl.from(letters, { yPercent: 120, stagger: 0.06, duration: 1, ease: 'expo.out' })
        .from(el.querySelector('.curtain__rule'), { scaleX: 0, duration: 0.9, ease: 'expo.inOut' }, '-=0.6')
        .from(el.querySelector('.curtain__sub'), { autoAlpha: 0, y: 10, duration: 0.6 }, '-=0.4')
        .to({}, { duration: 0.25 })
    } else {
      tl.set(letters, { yPercent: 0 }).to({}, { duration: 0.15 })
    }
    tl.to(el, { yPercent: -100, duration: isFirst ? 1.1 : 0.9, ease: 'expo.inOut' }).set(el, { autoAlpha: 0 })
    return () => tl.kill()
  }, [pathname])

  return (
    <div className="curtain" ref={ref} aria-hidden="true">
      <div className="curtain__mark">
        <span className="curtain__word">
          {'PORCEKA'.split('').map((l, i) => (
            <span key={i} className="curtain__mask"><span className="curtain__letter">{l}</span></span>
          ))}
        </span>
        <span className="curtain__rule" />
        <span className="curtain__sub">Surfaces That Define Spaces.</span>
      </div>
    </div>
  )
}
