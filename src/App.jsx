import { useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Curtain from './components/Curtain'
import Home from './pages/Home'
import About from './pages/About'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { useLenis, scrollToTarget } from './hooks/useLenis'
import { ScrollTrigger } from './animations/gsap'

// Rendered before <main> so its layout effect resets scroll before the new page
// builds its ScrollTriggers (also for #hash links); then, once laid out, honours the #hash.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useLayoutEffect(() => {
    scrollToTarget(0, { immediate: true })
  }, [pathname])
  useEffect(() => {
    ScrollTrigger.refresh()
    if (!hash) return
    const t = setTimeout(() => scrollToTarget(hash, { immediate: false }), 650)
    return () => clearTimeout(t)
  }, [pathname, hash])
  return null
}

export default function App() {
  useLenis()
  const { pathname } = useLocation()
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Curtain />
      <ScrollManager />
      <Header />
      <main id="main" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
