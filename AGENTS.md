# PORCEKA SURFACES LLP — website

Project root (absolute): `D:\CF\Codes\Client code\Porceka`

When calling the claude-code MCP tool, always pass absolute paths under this project root — the tool's working directory is Antigravity's install folder, not this project.

## Stack
- React 19 + Vite 8, React Router 7 (4 routes: `/`, `/about`, `/collections`, `/contact`)
- GSAP 3 (ScrollTrigger, SplitText, Flip) for all animation; Lenis for wheel smooth-scroll (touch stays native)
- lucide-react icons (brand icons live in `src/components/Icons.jsx`)
- Plain CSS: one design system file, `src/styles/global.css` (tokens on `:root`)

## Commands
- `npm run dev` — dev server
- `npm run build` — production build to `dist/` (also writes `robots.txt`, and `sitemap.xml` when `VITE_SITE_URL` is set)
- `npm run preview` — serve the build
- `npm test` — validation self-check (`src/lib/validate.test.mjs`)

## Rules
- Content source of truth: `docs/Company Profile 3.docx` (kept locally, not committed — ask the client for a copy). Never invent specs, certifications, awards, history, warehouses or contact details. `docs/Company Profile2.docx` is a generic template — only its Vision/Mission/Values themes are used.
- Brand + contact details live only in `src/data/site.js`; collection copy in `src/data/collections.js`. Official contact details (2 phones/WhatsApp, `info@porceka.com`, Instagram, GST principal-place-of-business address in Borivali West) are confirmed — never add personal names or other contact details.
- Images: `public/images/<name>-{900,1800}.webp`, rendered via `<Img name=… />`. Sources in `public/images/CREDITS.md`. They are representative photography, not Porceka products.
- Animations: use the `data-reveal` / `data-parallax` attributes handled by `useScrollAnimations` (`src/animations/gsap.js`). Every effect must be a `from` tween so content is visible without JS and under `prefers-reduced-motion`.
- Forms never fake success: submissions go through `src/lib/submitEnquiry.js` → `VITE_FORM_ENDPOINT`.
- Palette: ivory `#F5F2EC`, charcoal `#242321`, champagne `#C8B99F`, off-white `#FAF9F6`, dark `#1D1D1B`, plus logo teal `#0E2C30` and gold `#C9A96E`. Fonts: Cormorant Garamond (display), Manrope (body).
