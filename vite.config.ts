import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/amgen/', // Ajoute cette ligne pour définir le chemin de base
});
