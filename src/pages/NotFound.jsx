import Seo from '../components/Seo'
import MagneticButton from '../components/MagneticButton'

export default function NotFound() {
  return (
    <section className="notfound">
      <Seo title="Page not found" description="The page you are looking for does not exist." />
      <meta name="robots" content="noindex" />
      <p className="label">404</p>
      <h1 className="display">This space is still unfinished.</h1>
      <MagneticButton to="/" variant="light">Return home</MagneticButton>
    </section>
  )
}
