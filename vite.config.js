import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      jpg: {
        quality: 75,
      },
      jpeg: {
        quality: 75,
      },
      png: {
        quality: 75,
      },
      svg: {
        quality: 75,
      },
    })
  ],
})
