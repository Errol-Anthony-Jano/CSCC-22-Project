import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setup.js'],
    include: ['**/*.test.js', '**/*.test.jsx'],
    transform: {
      '^.+\\.jsx?$': 'babel-preset-vite',
    },
  },
});
