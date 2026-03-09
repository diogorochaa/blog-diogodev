import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AnimatedCover } from './AnimatedCover'

describe('AnimatedCover', () => {
  it('renders default label', () => {
    render(<AnimatedCover />)

    expect(screen.getByText('Conteudo')).toBeInTheDocument()
  })

  it('renders compact label when compact is true', () => {
    render(<AnimatedCover compact />)

    expect(screen.getByText('Post')).toBeInTheDocument()
  })
})
