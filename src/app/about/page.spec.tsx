import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import AboutPage from './page'

function getPersonJsonLdDescription() {
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  )
  const script = scripts.item(scripts.length - 1)

  if (!script?.textContent) {
    throw new Error('Expected person JSON-LD script to be rendered')
  }

  const personJsonLd = JSON.parse(script.textContent) as {
    description?: string
  }

  return personJsonLd.description
}

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
    expect(screen.getByText('Experiência Técnica')).toBeInTheDocument()
    expect(screen.getByText('repo-teste')).toBeInTheDocument()
    expect(getPersonJsonLdDescription()).toBe('Bio de teste')
  })

  it('uses fallback text when github requests fail', async () => {
    fetchMock.mockRejectedValue(new Error('network error'))

    render(await AboutPage())

    expect(getPersonJsonLdDescription()).toMatch(/como desenvolvedor/i)
    expect(getPersonJsonLdDescription()).toMatch(/moro em brasil/i)
  })
})
