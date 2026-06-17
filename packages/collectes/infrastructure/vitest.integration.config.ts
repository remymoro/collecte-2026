import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@collecte-2026/shared-kernel': resolve(__dirname, '../../shared/kernel/src/index.ts'),
      '@collecte-2026/collectes-domain': resolve(__dirname, '../domain/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    watch: false,
    root: __dirname,
    include: ['src/**/*.integration.spec.ts'],
    testTimeout: 120000,
    hookTimeout: 120000,
  },
});
