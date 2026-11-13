import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../animations/gsap'

// CTA that leans toward the pointer. Renders a router Link when `to` is set,
// otherwise a <button>. Pointer-only, so touch devices just get a normal button.
export default function MagneticButton({ to, children, variant = 'solid', className = '', ...rest }) {
  const ref = useRef(null)
  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left - r.width / 2
    const y = e.clientY - r.top - r.height / 2
    gsap.to(ref.current, { x: x * 0.25, y: y * 0.35, duration: 0.6, ease: 'power3.out' })
  }
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  const props = { ref, className: `btn btn--${variant} ${className}`, onPointerMove: move, onPointerLeave: leave, ...rest }
  const inner = (
    <>
      <span className="btn__label">{children}</span>
      <span className="btn__arrow" aria-hidden="true">→</span>
    </>
  )
  return to ? <Link to={to} {...props}>{inner}</Link> : <button type="button" {...props}>{inner}</button>
}
