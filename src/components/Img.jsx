// Responsive image from /public/images/<name>-{900,1800}.webp.
// width/height give the browser an aspect ratio up front so nothing shifts while loading.
export default function Img({ name, alt, eager = false, sizes = '100vw', className, ...rest }) {
  return (
    <img
      src={`/images/${name}-1800.webp`}
      srcSet={`/images/${name}-900.webp 900w, /images/${name}-1800.webp 1800w`}
      sizes={sizes}
      alt={alt}
      width="1800"
      height="1200"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      {...rest}
    />
  )
}
