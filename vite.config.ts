import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/explore-amgen\.staging\.jake-digital\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 1 semaine
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|ico|ttf)$/i, // Caching images, fonts, etc.
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 1 mois
              },
            },
          },
        ],
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
