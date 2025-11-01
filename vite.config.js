import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        options: './pages/options.html',
        tabwrap: './pages/tabwrap.html',
        tabwrapstats: './pages/tabwrapstats.html',
        category: './pages/category.html'
      }
    }
  }
});
