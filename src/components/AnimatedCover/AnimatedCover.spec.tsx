import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { AnimatedCover } from './AnimatedCover'

describe('AnimatedCover', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders default label', () => {
    render(<AnimatedCover />)

    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })

  it('renders compact label when compact is true', () => {
    render(<AnimatedCover compact />)

    expect(screen.getByText('Artigo')).toBeInTheDocument()
  })

  it('renders custom badge label', () => {
    render(<AnimatedCover compact badgeLabel="Conteúdo" />)

    expect(screen.getByText('Conteúdo')).toBeInTheDocument()
  })

  it('hides badge when showBadge is false', () => {
    render(<AnimatedCover showBadge={false} />)

    expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument()
    expect(screen.queryByText('Artigo')).not.toBeInTheDocument()
  })
})
