import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip)
gsap.defaults({ ease: 'power3.out', duration: 1 })

// Set by <Curtain> before pages animate: how long until the curtain has lifted,
// so hero reveals play in view instead of behind it.
export const timing = { heroDelay: 0 }

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Declarative scroll animations. Inside the returned ref's element:
 *   data-reveal="lines"  headline split into masked lines that rise in
 *   data-reveal="fade"   fades + lifts in (children stagger with data-stagger)
 *   data-reveal="image"  clip-path wipe with the inner <img> settling from a zoom
 *   data-parallax="12"   inner <img> drifts by N% while the element crosses the viewport
 * `setup({ reduced, root })` runs inside the same gsap.context for page-specific timelines;
 * it may return a cleanup (pages use it to revert their gsap.matchMedia()).
 * Content is fully visible without JS or with reduced motion: everything here is a `from` tween.
 */
export function useScrollAnimations(setup, deps = []) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    if (!ref.current) return
    const reduced = prefersReducedMotion()
    const splits = []
    let cleanup
    const ctx = gsap.context(() => {
      if (!reduced) {
        // Plays once and stays. Not `once: true`: a once-trigger created already past its start
        // kills itself mid-creation, corrupting ScrollTrigger's list during refresh().
        const trigger = (el, start = 'top 85%') => ({ trigger: el, start, toggleActions: 'play none none none' })

        ref.current.querySelectorAll('[data-reveal="lines"]').forEach((el) => {
          const inHero = el.closest('[data-hero]')
          // Split once (main.jsx waits for web fonts first). No autoSplit: re-splitting kills
          // ScrollTriggers at arbitrary moments, which breaks ScrollTrigger.refresh().
          // The split is undone once the reveal has played so text reflows on resize again.
          const split = SplitText.create(el, { type: 'lines', mask: 'lines' })
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.3,
            stagger: 0.12,
            ease: 'expo.out',
            delay: inHero ? timing.heroDelay + 0.1 : 0,
            onComplete: () => split.revert(),
            ...(inHero ? {} : { scrollTrigger: trigger(el) }),
          })
          splits.push(split)
        })

        ref.current.querySelectorAll('[data-reveal="fade"]').forEach((el) => {
          const targets = el.hasAttribute('data-stagger') ? el.children : el
          const inHero = el.closest('[data-hero]')
          gsap.from(targets, {
            y: 36,
            autoAlpha: 0,
            duration: 1.1,
            stagger: 0.1,
            delay: inHero ? timing.heroDelay + 0.5 : 0,
            ...(inHero ? {} : { scrollTrigger: trigger(el) }),
          })
        })

        ref.current.querySelectorAll('[data-reveal="image"]').forEach((el) => {
          const tl = gsap.timeline({ scrollTrigger: trigger(el, 'top 88%') })
          tl.from(el, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
          const img = el.querySelector('img')
          if (img) tl.from(img, { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.2)
        })

        ref.current.querySelectorAll('[data-parallax]').forEach((el) => {
          const img = el.querySelector('img')
          const amount = Number(el.dataset.parallax) || 10
          gsap.fromTo(
            img,
            { yPercent: -amount, scale: 1 + amount / 50 },
            { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })
      }
      cleanup = setup?.({ reduced, root: ref.current })
    }, ref)
    // Images above may still be decoding; recompute trigger positions once they are in.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      cleanup?.()
      ctx.revert()
      splits.forEach((s) => s.revert())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return ref
}

export { gsap, ScrollTrigger, Flip }
