import Img from './Img'
import MagneticButton from './MagneticButton'

export default function CTASection({ title, text, button, to = '/contact', image = 'marble-black' }) {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="cta__media" data-parallax="14">
        <Img name={image} alt="" sizes="100vw" />
      </div>
      <div className="container cta__inner">
        <p className="label label--light" data-reveal="fade">Begin the conversation</p>
        <h2 id="cta-title" className="display" data-reveal="lines">{title}</h2>
        {text && <p className="cta__text" data-reveal="fade">{text}</p>}
        <div data-reveal="fade">
          <MagneticButton to={to} variant="light">{button}</MagneticButton>
        </div>
      </div>
    </section>
  )
}
