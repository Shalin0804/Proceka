// Typeset wordmark matching the supplied logo (wide geometric caps over a rule).
// The raster original lives at /public/images/porceka-logo.jpg for social previews.
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo__main">PORCEKA</span>
      <span className="logo__sub">SURFACES</span>
    </span>
  )
}
