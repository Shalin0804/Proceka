# PORCEKA SURFACES LLP

*Surfaces That Define Spaces.* — the four-page brand website (Home, About Us, Collections, Contact Us).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm test          # form validation self-check
```

## Before going live

1. **Contact details** — replace the `[Official Email]` / `[Official Number]` placeholders and set `instagramUrl` in `src/data/site.js`. Until the Instagram URL is set, Instagram links open an Instagram search for "Porceka Surfaces".
2. **Enquiry forms** — copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT` to a service that accepts a JSON `POST` (e.g. Formspree `https://formspree.io/f/<id>`, Web3Forms, or your own API). The integration point is `src/lib/submitEnquiry.js`. Without it, forms validate but show a clear "being set up" message instead of pretending to send.
3. **Domain** — set `VITE_SITE_URL` (e.g. `https://www.example.com`) to enable canonical URLs and generate `sitemap.xml` at build time.
4. **Photography** — images are representative Unsplash photography (see `public/images/CREDITS.md`). Swap in Porceka's own product and project photos, keeping the `<name>-900.webp` / `<name>-1800.webp` naming.

## Deploying

Any static host works. SPA rewrites are included for Vercel (`vercel.json`) and Netlify (`public/_redirects`); on other hosts, route all paths to `index.html`.

## Structure

```
src/
  animations/gsap.js     GSAP setup + declarative scroll animations (data-reveal / data-parallax)
  hooks/useLenis.js      smooth scrolling + scrollToTarget()
  components/            Header, Footer, Curtain (preloader + page transition), EnquiryForm, Lightbox, …
  pages/                 Home, About, Collections, Contact, NotFound
  data/                  site.js (brand, contact, nav), collections.js
  lib/                   validate.js, submitEnquiry.js
  styles/global.css      design system
docs/                    client company profiles + original logo
```
