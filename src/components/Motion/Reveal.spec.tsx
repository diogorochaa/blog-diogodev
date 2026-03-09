import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Reveal } from './Reveal'

describe('Reveal', () => {
  it('renders children content', () => {
    render(
      <Reveal>
        <p>Conteudo visivel</p>
      </Reveal>,
    )

    expect(screen.getByText('Conteudo visivel')).toBeInTheDocument()
  })
})
