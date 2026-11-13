import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/gsap'

// One Lenis instance for the app. Wheel scrolling is smoothed; touch stays native
// so mobile scrolling is never hijacked. Disabled entirely for reduced motion.
let lenis = null
export const getLenis = () => lenis

export function scrollToTarget(target, { immediate = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (target !== 0 && !el) return
  const offset = -(document.querySelector('.site-header')?.offsetHeight ?? 0)
  if (lenis) lenis.scrollTo(el ?? 0, { offset: el ? offset : 0, immediate, duration: 1.4 })
  else window.scrollTo({ top: el ? el.getBoundingClientRect().top + window.scrollY + offset : 0, behavior: immediate ? 'instant' : 'smooth' })
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
