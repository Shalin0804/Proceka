import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/global.css'

// No StrictMode: its double-invoked layout effects replay GSAP timelines (preloader, reveals) in dev.
// Headlines are split into lines once, so render after the web fonts are in (capped, so a
// slow font CDN never blocks the site).
// The app manages scroll per route; stop the browser restoring an old position under it.
history.scrollRestoration = 'manual'

const faces = ['300 1em "Cormorant Garamond"', 'italic 300 1em "Cormorant Garamond"', '400 1em Manrope']
const fontsReady = Promise.race([
  Promise.all(faces.map((f) => document.fonts?.load(f))).catch(() => {}),
  new Promise((r) => setTimeout(r, 1500)),
])
fontsReady.then(() =>
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  ),
)
