import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://reservas-cancha-1.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
