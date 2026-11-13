import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'

const ROUTES = ['/', '/about', '/collections', '/contact']

// Writes robots.txt + sitemap.xml into dist. The sitemap and canonical URLs need the real
// production domain, so they are only produced once VITE_SITE_URL is set (see README).
function seoFiles(siteUrl) {
  return {
    name: 'porceka-seo-files',
    apply: 'build',
    closeBundle() {
      const base = siteUrl?.replace(/\/$/, '')
      writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`)
      if (!base) return
      const urls = ROUTES.map((r) => `  <url><loc>${base}${r}</loc></url>`).join('\n')
      writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return { plugins: [react(), seoFiles(env.VITE_SITE_URL)] }
})
