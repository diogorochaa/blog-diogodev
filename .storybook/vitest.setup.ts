import '@testing-library/jest-dom/vitest'

import { setProjectAnnotations } from '@storybook/nextjs-vite'

import * as projectAnnotations from './preview'

setProjectAnnotations(projectAnnotations)
