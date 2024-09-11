import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,ttf}'],
        runtimeCaching: [
          {
            urlPattern:
              /^https:\/\/explore-amgen\.staging\.jake-digital\.com\/storage\/questions\/[\w-]+\.(jpg|jpeg|png|gif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'quiz-images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/explore-amgen\.staging\.jake-digital\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        navigateFallback: '/amgen/index.html',
        navigateFallbackAllowlist: [/^\/amgen\//],
      },
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Mon Application PWA',
        short_name: 'PWA App',
        description: 'Ma super application PWA',
        theme_color: '#ffffff',
        start_url: '/amgen/',
        scope: '/amgen/',
        display: 'standalone',
      },
    }),
  ],
  base: '/amgen/',
});
