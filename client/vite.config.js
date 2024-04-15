import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://international-messaging-system-ca658f73b538.herokuapp.com',
        secure: false,
        changeOrigin: true,
      }
    }
  }
});