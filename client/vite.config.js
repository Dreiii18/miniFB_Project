import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow external access
    port: 3000       // Ensure the correct port is being used
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
