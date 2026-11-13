import { useLocation } from 'react-router-dom'

const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')

// React 19 hoists <title>/<meta>/<link> rendered anywhere into <head>.
export default function Seo({ title, description }) {
  const { pathname } = useLocation()
  const fullTitle = `${title} | PORCEKA SURFACES LLP`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {SITE_URL && <link rel="canonical" href={`${SITE_URL}${pathname}`} />}
      {SITE_URL && <meta property="og:url" content={`${SITE_URL}${pathname}`} />}
      {SITE_URL && <meta property="og:image" content={`${SITE_URL}/images/porceka-logo.jpg`} />}
    </>
  )
}
