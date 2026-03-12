import type { Preview } from '@storybook/nextjs-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'

import './storybook.css'

const responsiveViewports = {
  ...INITIAL_VIEWPORTS,
  desktopWide: {
    name: 'Desktop 1440',
    styles: {
      width: '1440px',
      height: '1024px',
    },
    type: 'desktop' as const,
  },
  laptop: {
    name: 'Laptop 1280',
    styles: {
      width: '1280px',
      height: '900px',
    },
    type: 'desktop' as const,
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      presetColors: [
        { color: '#0a0a0f', title: 'Primary' },
        { color: '#1a1a2e', title: 'Secondary' },
        { color: '#22d3ee', title: 'Accent Cyan' },
        { color: '#8b5cf6', title: 'Accent Purple' },
        { color: '#3b82f6', title: 'Accent Blue' },
        { color: '#ec4899', title: 'Accent Pink' },
      ],
      sort: 'alpha',
    },
    viewport: {
      options: responsiveViewports,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Docs'],
      },
    },
  },
  initialGlobals: {
    viewport: {
      value: 'desktopWide',
      isRotated: false,
    },
  },
}

export default preview
