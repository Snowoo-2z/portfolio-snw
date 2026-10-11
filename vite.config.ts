import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Portfolio SNW — configuration unique.
 *
 * BASE_URL permet de déployer dans un sous-dossier (GitHub Pages) :
 *   BASE_URL=/portfolio-snw/ npm run build
 */
const base = process.env.BASE_URL ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssTarget: 'chrome100',
    assetsInlineLimit: 2048,
    reportCompressedSize: false,
  },
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    // Le proxy de prévisualisation sert le site depuis un domaine distant :
    // on autorise explicitement l'hôte pour ne jamais bloquer l'aperçu.
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
    allowedHosts: true,
  },
});
