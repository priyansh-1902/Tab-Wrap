import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import CategoryPage from './src/CategoryPage';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: {
        options: './options.html',
        tabwrap: './tabwrap.html',
        tabwrapstats: './tabwrapstats.html',
        work: './work.html',
        finance: './finance.html',
        hobbies: './hobbies.html',
        social: './social.html',
        shopping: './shopping.html',
        entertainment: './entertainment.html',
        spirituality: './spirituality.html',
        health: './health.html',
        community: './community.html',
        news: './news.html',
        travel: './travel.html'


      }
    }
  }
});
