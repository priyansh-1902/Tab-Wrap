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
        work: './work.html',
        finance: './finance.html',
        hobbies: './hobbies.html',
        socialmedia: './socialmedia.html',
        shopping: './shopping.html',
        entertainment: './entertainment.html',
        spirituality: './spirituality.html',
        fitness: './fitness.html',
        community: './community.html',
  news: './news.html',
  travel: './travel.html'


      }
    }
  }
});
