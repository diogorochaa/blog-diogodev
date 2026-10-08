import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { AboutContent } from '@/models'

import AboutPage from './page'

const serviceMocks = vi.hoisted(() => ({
  getAboutContent: vi.fn(),
  getProfile: vi.fn(),
  getRepos: vi.fn(),
}))

vi.mock('@/services', () => ({
  ContentService: {
    getAboutContent: serviceMocks.getAboutContent,
  },
  GithubService: {
    getProfile: serviceMocks.getProfile,
    getRepos: serviceMocks.getRepos,
    getProfileUrl: () => 'https://github.com/diogorochaa',
  },
  PortfolioService: {
    getProfile: vi.fn().mockResolvedValue(null),
  },
}))

const mockAboutContent: AboutContent = {
  title: 'Sobre mim',
  greeting: 'Olá, Dev!',
  intro: 'Texto sobre o autor',
  avatarAlt: 'Foto de perfil',
  reposLabel: 'Repositórios',
  followersLabel: 'Seguidores',
  experienceHeading: 'Experiência Técnica',
  experienceDescription: 'Experiências principais',
  projectsHeading: 'Projetos em Destaque',
  emptyProjectsText: 'Nenhum repositório disponível no momento.',
  githubLinkLabel: 'Visite meu GitHub',
  seoTitle: 'Sobre mim',
  seoDescription: 'Conheça mais sobre o autor.',
  ogTitle: 'Diogo Rocha',
  ogDescription: 'Trajetória e projetos.',
  experiences: [
    {
      name: 'React',
      startYear: 2020,
      color: '#ff6a00',
      category: 'frontend',
      iconKey: 'AtomIcon',
    },
  ],
  slices: [],
}

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
  beforeEach(() => {
    serviceMocks.getAboutContent.mockResolvedValue(mockAboutContent)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders github profile and repos when requests succeed', async () => {
    serviceMocks.getProfile.mockResolvedValue({
      avatar_url: '',
      name: 'Diogo Rocha',
      company: 'ACME',
      location: 'Sao Paulo',
      bio: 'Bio de teste',
      public_repos: 12,
      followers: 34,
    })
    serviceMocks.getRepos.mockResolvedValue([
      {
        id: 1,
        name: 'repo-teste',
        description: 'descricao',
        html_url: 'https://github.com/diogorochaa/repo-teste',
        language: 'TypeScript',
        stargazers_count: 10,
        forks_count: 3,
      },
    ])

    render(await AboutPage())

    expect(
      screen.getByRole('heading', { level: 1, name: 'Sobre mim' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Experiência Técnica')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'repo-teste' }),
    ).toBeInTheDocument()
    expect(getPersonJsonLdDescription()).toBe('Bio de teste')
  })

  it('uses fallback text when github requests fail', async () => {
    serviceMocks.getProfile.mockResolvedValue({
      avatar_url: '',
      name: 'Diogo Rocha',
      company: null,
      location: 'Brasil',
      bio: '',
      public_repos: 0,
      followers: 0,
    })
    serviceMocks.getRepos.mockResolvedValue([])

    render(await AboutPage())

    expect(getPersonJsonLdDescription()).toMatch(/como desenvolvedor/i)
    expect(getPersonJsonLdDescription()).toMatch(/moro em brasil/i)
  })
})
