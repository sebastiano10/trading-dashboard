import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',          // relative paths so extension:// URLs work
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
