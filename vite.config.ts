import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg,ttf}'],
          runtimeCaching: [
            {
              urlPattern: new RegExp(`^${env.VITE_API_BASE_URL}/storage/questions/[\\w-]+\\.(jpg|jpeg|png|gif)$`),
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
              urlPattern: new RegExp(`^${env.VITE_API_BASE_URL}/.*`, 'i'),
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
          name: 'Explor AMGEN',
          short_name: 'Explor AMGEN',
          description: 'Application de quiz pour AMGEN',
          icons: [
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
            },
            {
              src: 'apple-touch-icon.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: 'masked-icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
            },
          ],
          theme_color: '#ffffff',
          start_url: '/amgen/',
          scope: '/amgen/',
          display: 'standalone',
        },
      }),
    ],
    base: '/amgen/',
  };
});
