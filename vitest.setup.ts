import React from 'react'

import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('framer-motion', () => {
  const MockComponent = ({
    children,
    initial: _initial,
    animate: _animate,
    transition: _transition,
    whileInView: _whileInView,
    viewport: _viewport,
    ...props
  }: Record<string, unknown>) =>
    React.createElement('div', props, children as React.ReactNode)

  const motion = new Proxy(
    {},
    {
      get() {
        return MockComponent
      },
    },
  )

  return {
    motion,
    useReducedMotion: () => false,
  }
})
