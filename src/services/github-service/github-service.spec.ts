import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { buildGithubStats, GithubService } from './github-service'
import { profileFallback } from './github-service.constants'

describe('GithubService', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('returns profile when github responds with valid data', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        avatar_url: 'https://github.com/avatar.png',
        name: 'Diogo Rocha',
        company: 'ACME',
        location: 'Brasil',
        bio: 'Bio',
        public_repos: 10,
        followers: 20,
      }),
    })

    const profile = await GithubService.getProfile()

    expect(profile.name).toBe('Diogo Rocha')
    expect(profile.public_repos).toBe(10)
  })

  it('returns fallback profile when github responds with invalid data', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: true }),
    })

    const profile = await GithubService.getProfile()

    expect(profile).toEqual(profileFallback)
  })

  it('returns fallback profile when github request fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network error'))

    const profile = await GithubService.getProfile()

    expect(profile).toEqual(profileFallback)
  })

  it('returns repos when github responds with valid data', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: 'repo-teste',
          description: 'descricao',
          html_url: 'https://github.com/diogorochaa/repo-teste',
          language: 'TypeScript',
          stargazers_count: 1,
          forks_count: 2,
        },
      ],
    })

    const repos = await GithubService.getRepos()

    expect(repos).toHaveLength(1)
    expect(repos[0].name).toBe('repo-teste')
  })

  it('returns empty repos when github request fails', async () => {
    fetchMock.mockRejectedValueOnce(new Error('network error'))

    const repos = await GithubService.getRepos()

    expect(repos).toEqual([])
  })

  it('aggregates stars, forks and languages ignoring forked repos', () => {
    const stats = buildGithubStats(
      {
        avatar_url: '',
        name: 'Diogo Rocha',
        company: null,
        location: null,
        bio: null,
        public_repos: 11,
        followers: 14,
      },
      [
        {
          id: 1,
          name: 'a',
          description: null,
          html_url: 'https://github.com/x/a',
          language: 'TypeScript',
          stargazers_count: 5,
          forks_count: 1,
        },
        {
          id: 2,
          name: 'b',
          description: null,
          html_url: 'https://github.com/x/b',
          language: 'TypeScript',
          stargazers_count: 2,
          forks_count: 0,
        },
        {
          id: 3,
          name: 'c',
          description: null,
          html_url: 'https://github.com/x/c',
          language: 'Python',
          stargazers_count: 1,
          forks_count: 0,
        },
        {
          id: 4,
          name: 'fork',
          description: null,
          html_url: 'https://github.com/x/fork',
          language: 'Go',
          stargazers_count: 100,
          forks_count: 100,
          fork: true,
        },
      ],
    )

    expect(stats).toEqual({
      isAvailable: true,
      publicRepos: 11,
      followers: 14,
      totalStars: 8,
      totalForks: 1,
      topLanguages: [
        { name: 'TypeScript', repos: 2 },
        { name: 'Python', repos: 1 },
      ],
    })
  })

  it('flags stats as unavailable when the profile request fails', async () => {
    fetchMock.mockRejectedValue(new Error('network error'))

    const stats = await GithubService.getStats()

    expect(stats.isAvailable).toBe(false)
    expect(stats.publicRepos).toBe(0)
    expect(stats.topLanguages).toEqual([])
  })
})
