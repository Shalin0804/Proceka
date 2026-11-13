import { useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Img from './Img'
import { gsap, prefersReducedMotion } from '../animations/gsap'
import { getLenis } from '../hooks/useLenis'

// Full-screen image preview. items: [{ image, alt, caption }]; index null = closed.
export default function Lightbox({ items, index, onChange }) {
  const ref = useRef(null)
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const open = index !== null
  const go = (d) => onChange((index + d + items.length) % items.length)
  const close = () => onChange(null)

  // Scroll lock + focus handoff: once per open/close, not per image.
  useEffect(() => {
    if (!open) return
    const previous = document.activeElement
    getLenis()?.stop()
    document.documentElement.classList.add('menu-open')
    closeRef.current?.focus()
    return () => {
      getLenis()?.start()
      document.documentElement.classList.remove('menu-open')
      previous?.focus?.({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'Tab') {
        // keep focus inside the dialog
        const els = ref.current.querySelectorAll('button')
        const [first, last] = [els[0], els[els.length - 1]]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index])

  useLayoutEffect(() => {
    if (!open || prefersReducedMotion()) return
    gsap.fromTo(ref.current.querySelector('.lightbox__figure'), { autoAlpha: 0, scale: 0.97 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'expo.out' })
  }, [open, index])

  if (!open) return null
  const item = items[index]
  return createPortal(
    <div
      className="lightbox"
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={(e) => e.target === e.currentTarget && close()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
      }}
    >
      <button ref={closeRef} className="lightbox__close" onClick={close} aria-label="Close preview"><X size={26} strokeWidth={1.3} /></button>
      <button className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft size={30} strokeWidth={1.2} /></button>
      <figure className="lightbox__figure" onClick={(e) => e.target === e.currentTarget && close()}>
        <Img name={item.image} alt={item.alt} eager sizes="100vw" />
        <figcaption>
          <span>{item.caption}</span>
          <span>{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image"><ChevronRight size={30} strokeWidth={1.2} /></button>
    </div>,
    document.body,
  )
}
