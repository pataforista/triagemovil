import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use '/' for Cloudflare Pages (root) or '/triagemovil/' for GitHub Pages (subfolder)
  base: process.env.BASE_PATH || '/triagemovil/',
})
