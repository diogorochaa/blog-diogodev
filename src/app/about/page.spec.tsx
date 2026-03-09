import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AboutPage from './page'

describe('/about page', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('renders github profile and repos when requests succeed', async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          avatar_url: '',
          name: 'Diogo Rocha',
          company: 'ACME',
          location: 'Sao Paulo',
          bio: 'Bio de teste',
          public_repos: 12,
          followers: 34,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'repo-teste',
            description: 'descricao',
            html_url: 'https://github.com/diogorochaa/repo-teste',
            language: 'TypeScript',
            stargazers_count: 10,
            forks_count: 3,
          },
        ],
      })

    render(await AboutPage())

    expect(screen.getByText('Sobre mim')).toBeInTheDocument()
    expect(screen.getByText('repo-teste')).toBeInTheDocument()
    expect(screen.getByText('Bio de teste')).toBeInTheDocument()
  })

  it('uses fallback text when github requests fail', async () => {
    fetchMock.mockRejectedValue(new Error('network error'))

    render(await AboutPage())

    expect(screen.getByText(/como desenvolvedor/i)).toBeInTheDocument()
    expect(screen.getByText(/moro em brasil/i)).toBeInTheDocument()
  })
})
