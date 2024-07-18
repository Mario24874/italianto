import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    outDir: "./dist",
    minify: 'terser', // Minifica el código JS/CSS
    terserOptions: {
      compress: {
        drop_console: true, // Elimina las declaraciones console
        drop_debugger: true, // Elimina las declaraciones debugger
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // Evita agrupar manualmente los chunks
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Ejemplo de proxy para API local
    },
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  }
});