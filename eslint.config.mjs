import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier/flat'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      camelcase: 'off',
    },
  },
  {
    files: ['**/*.stories.ts', '**/*.stories.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'sb-addons/**',
    'sb-common-assets/**',
    'sb-manager/**',
    'next-env.d.ts',
    'node_modules/**',
    'src/slices/index.ts',
    'public/sw.js',
    'public/workbox-*.js',
  ]),
])
