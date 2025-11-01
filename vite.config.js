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
        work: './pages/work.html',
        finance: '/pages/finance.html',
        hobbies: '/pages/hobbies.html',
        social: '/pages/social.html',
        shopping: '/pages/shopping.html',
        entertainment: '/pages/entertainment.html',
        spirituality: '/pages/spirituality.html',
        health: '/pages/health.html',
        community: '/pages/community.html',
        news: '/pages/news.html',
        travel: '/pages/travel.html'
      }
    }
  }
});
