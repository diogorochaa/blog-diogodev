import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Profile } from './Profile'

describe('Profile', () => {
  it('renders title and subtitle', () => {
    render(
      <Profile
        items={{
          name: 'Blog | diogodev_',
          description: 'desc',
          title: 'Engenheiro de software',
          subtitle: 'Conteudo sobre tecnologia',
          url: 'https://meusite.com.br',
          links: {
            instagram: 'https://instagram.com',
            github: 'https://github.com',
            linkedin: 'https://linkedin.com',
          },
        }}
      />,
    )

    expect(screen.getByText('Engenheiro de software')).toBeInTheDocument()
    expect(screen.getByText('Conteudo sobre tecnologia')).toBeInTheDocument()
  })
})
