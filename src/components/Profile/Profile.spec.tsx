import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { fallbackHomeContent } from '@/config'

import { Profile } from './Profile'

describe('Profile', () => {
  it('renders title and subtitle', () => {
    render(
      <Profile
        items={{
          ...fallbackHomeContent,
          heroBadge: 'Developer Blog',
          title: 'Engenheiro de software',
          subtitle: 'Conteudo sobre tecnologia',
        }}
      />,
    )

    expect(screen.getByText('Engenheiro de software')).toBeInTheDocument()
    expect(screen.getByText('Conteudo sobre tecnologia')).toBeInTheDocument()
  })
})
