import Img from './Img'

// Full-bleed image hero shared by inner pages. Headline lines are split on <br/>-free
// text by SplitText, so pass natural line breaks as separate children if needed.
export default function PageHero({ label, title, text, image, alt, children, tall = false }) {
  return (
    <section className={`page-hero ${tall ? 'page-hero--tall' : ''}`} data-hero>
      <div className="page-hero__media" data-hero-media>
        <Img name={image} alt={alt} eager />
      </div>
      <div className="page-hero__shade" />
      <div className="container page-hero__content">
        <p className="label label--light" data-reveal="fade">{label}</p>
        <h1 className="display" data-reveal="lines">{title}</h1>
        {text && <p className="page-hero__text" data-reveal="fade">{text}</p>}
        {children}
      </div>
    </section>
  )
}
