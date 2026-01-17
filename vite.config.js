import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    // proxy: {
    //   '/api': {
    //     target: 'https://jajis.up.railway.app/api/',
    //     // target: 'http://127.0.0.1:8000/api/',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
