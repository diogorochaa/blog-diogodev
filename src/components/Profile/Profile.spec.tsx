import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { HomeContent } from '@/models'

import { Profile } from './Profile'

const mockHomeContent: HomeContent = {
  heroBadge: 'Developer Blog',
  title: 'Engenheiro de software',
  subtitle: 'Conteudo sobre tecnologia',
  description: 'Descrição da home',
  featuredPostsLimit: 10,
  slices: [],
  ogTitle: 'Blog',
  ogDescription: 'Descrição OG',
}

describe('Profile', () => {
  it('renders title and subtitle', () => {
    render(<Profile items={mockHomeContent} />)

    expect(screen.getByText('Engenheiro de software')).toBeInTheDocument()
    expect(screen.getByText('Conteudo sobre tecnologia')).toBeInTheDocument()
  })
})
