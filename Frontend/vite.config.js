import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Vercel serves https://www.wceartcircle.in at the root -> base '/'
// GitHub Pages project page needs the repo subpath, set via PAGES_BASE
export default defineConfig({
  plugins: [react()],
  base: process.env.PAGES_BASE || '/',
  build: { outDir: 'build' },
})
