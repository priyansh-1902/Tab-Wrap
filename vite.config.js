import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        options: './options.html',
        tabwrap: './tabwrap.html',
        tabwrapstats: './tabwrapstats.html',
        test_page: './test_page.html',
        socialmedia: './socialmedia.html',
        work: './work.html'
      }
    }
  }
});
