import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: [
    '../src/storybook/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
  ],
  framework: '@storybook/nextjs-vite',
  docs: {
    autodocs: 'tag',
  },
  // Stories import server components that reach `src/prismicio.ts`.
  viteFinal: (viteConfig) => {
    viteConfig.resolve ??= {}
    viteConfig.resolve.alias = {
      ...viteConfig.resolve.alias,
      'node:dns': fileURLToPath(new URL('./node-dns-stub.ts', import.meta.url)),
    }
    return viteConfig
  },
}
export default config
