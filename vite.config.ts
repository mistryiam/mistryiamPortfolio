import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// The site is served from https://mistryiam.github.io/mistryiamPortfolio/, so every
// asset URL needs that prefix. Change this if the repo is renamed or a custom
// domain is added (a custom domain serves from the root, so base becomes '/').
export default defineConfig({
  base: '/mistryiamPortfolio/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // Three.js is inherently large. It is reached only through the lazy import
    // of the scene, so Rollup's own splitting keeps it out of the initial load —
    // naming it in manualChunks actually made things worse by pulling
    // react-reconciler into the eager bundle.
    chunkSizeWarningLimit: 1000,
  },
});
