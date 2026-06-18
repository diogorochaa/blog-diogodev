import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { AboutExperience } from './AboutExperience'

const baseItem = {
  name: 'React',
  startYear: new Date().getFullYear(),
  color: '#22d3ee',
  category: 'frontend' as const,
}

describe('AboutExperience', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders experience icons from Phosphor component names', () => {
    render(
      <AboutExperience
        heading="Experiência"
        description="Stack principal"
        showCharts={false}
        items={[
          {
            ...baseItem,
            iconKey: 'AtomIcon',
          },
        ]}
      />,
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('falls back to CodeIcon when the Phosphor icon name is invalid', () => {
    render(
      <AboutExperience
        heading="Experiência"
        description="Stack principal"
        showCharts={false}
        items={[
          {
            ...baseItem,
            iconKey: 'IconeInexistente',
          },
        ]}
      />,
    )

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})
