import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` keeps the production build portable (GitHub Pages, sub-folders, static hosts).
// Routing is hash-based, so no server-side rewrite rules are needed.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { port: 5173 },
  // Built files go to /docs so GitHub Pages can serve them with "Deploy from a branch → main → /docs".
  build: { outDir: 'docs', emptyOutDir: true },
});
