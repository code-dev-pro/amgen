import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*'],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Explor'Amgen",
        short_name: 'AMGEN',
        description:
          'Amgen est une application qui vous permet de répondre à un quiz sur différents sujets liés à Amgen.',
        theme_color: '#000000',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
          },
        ],
        lang: 'fr',
        scope: '/amgen/',
        start_url: '/amgen/',
      },
    }),
  ],
  base: '/amgen',
});
