import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
        })
      ]
    }
  },
  // Make sure CSS modules are processed correctly
  build: {
    cssCodeSplit: true,
    sourcemap: true
  }
})
