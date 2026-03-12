import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const srcPath = fileURLToPath(new URL('./src', import.meta.url))
const localPlaywrightLibsPath = fileURLToPath(
  new URL('./.cache/playwright-libs/usr/lib/x86_64-linux-gnu', import.meta.url),
)

if (process.platform === 'linux' && existsSync(localPlaywrightLibsPath)) {
  process.env.LD_LIBRARY_PATH = [
    localPlaywrightLibsPath,
    process.env.LD_LIBRARY_PATH,
  ]
    .filter(Boolean)
    .join(':')
}

export default defineConfig({
  publicDir: 'public',
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.*', 'src/slices/**', 'src/storybook/**'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./vitest.setup.ts'],
          include: ['src/**/*.spec.ts', 'src/**/*.spec.tsx'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: '.storybook',
            storybookScript: 'npm run storybook -- --ci',
            storybookUrl: 'http://localhost:6006',
          }),
        ],
        test: {
          name: 'storybook',
          setupFiles: ['./.storybook/vitest.setup.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: 'chromium',
                viewport: {
                  width: 1440,
                  height: 1024,
                },
              },
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@': srcPath,
    },
  },
})
