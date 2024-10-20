import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/loans': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/books': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/recommendations': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    },
  },
});
