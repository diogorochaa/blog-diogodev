import { cache } from 'react'

import type { GithubProfile, GithubStats, Repo } from '@/models'

import {
  GITHUB_API_BASE_URL,
  GITHUB_RECENT_REPOS_LIMIT,
  GITHUB_TOP_LANGUAGES_LIMIT,
  GITHUB_USER,
  githubFetchOptions,
  profileFallback,
} from './github-service.constants'

const isGithubProfile = (value: unknown): value is GithubProfile => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const profile = value as Record<string, unknown>

  return (
    typeof profile.avatar_url === 'string' &&
    typeof profile.name === 'string' &&
    typeof profile.public_repos === 'number' &&
    typeof profile.followers === 'number'
  )
}

const isRepoArray = (value: unknown): value is Repo[] => {
  return (
    Array.isArray(value) &&
    value.every((item) => {
      if (!item || typeof item !== 'object') {
        return false
      }

      const repo = item as Record<string, unknown>

      return (
        typeof repo.id === 'number' &&
        typeof repo.name === 'string' &&
        typeof repo.html_url === 'string'
      )
    })
  )
}

const fetchProfile = cache(
  async (user: string = GITHUB_USER): Promise<GithubProfile | null> => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/users/${user}`,
        githubFetchOptions,
      )

      if (!response.ok) {
        return null
      }

      const data: unknown = await response.json()

      return isGithubProfile(data) ? data : null
    } catch {
      return null
    }
  },
)

/** One request feeds both the recent repos list and the aggregated stats. */
const fetchOwnedRepos = cache(
  async (user: string = GITHUB_USER): Promise<Repo[] | null> => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/users/${user}/repos?type=owner&sort=updated&per_page=100`,
        githubFetchOptions,
      )

      if (!response.ok) {
        return null
      }

      const data: unknown = await response.json()

      return isRepoArray(data) ? data : null
    } catch {
      return null
    }
  },
)

export const buildGithubStats = (
  profile: GithubProfile | null,
  repos: Repo[] | null,
): GithubStats => {
  const sourceRepos = (repos ?? []).filter((repo) => !repo.fork)
  const languageCount = new Map<string, number>()

  for (const repo of sourceRepos) {
    if (repo.language) {
      languageCount.set(
        repo.language,
        (languageCount.get(repo.language) ?? 0) + 1,
      )
    }
  }

  return {
    isAvailable: profile !== null,
    publicRepos: profile?.public_repos ?? 0,
    followers: profile?.followers ?? 0,
    totalStars: sourceRepos.reduce(
      (total, repo) => total + (repo.stargazers_count ?? 0),
      0,
    ),
    totalForks: sourceRepos.reduce(
      (total, repo) => total + (repo.forks_count ?? 0),
      0,
    ),
    topLanguages: Array.from(languageCount, ([name, count]) => ({
      name,
      repos: count,
    }))
      .sort(
        (first, second) =>
          second.repos - first.repos || first.name.localeCompare(second.name),
      )
      .slice(0, GITHUB_TOP_LANGUAGES_LIMIT),
  }
}

export const GithubService = {
  getProfile: async (user?: string): Promise<GithubProfile> => {
    return (await fetchProfile(user || GITHUB_USER)) ?? profileFallback
  },
  getRepos: async (user?: string): Promise<Repo[]> => {
    const repos = await fetchOwnedRepos(user || GITHUB_USER)
    return (repos ?? []).slice(0, GITHUB_RECENT_REPOS_LIMIT)
  },
  getStats: async (user?: string): Promise<GithubStats> => {
    const resolvedUser = user || GITHUB_USER
    const [profile, repos] = await Promise.all([
      fetchProfile(resolvedUser),
      fetchOwnedRepos(resolvedUser),
    ])

    return buildGithubStats(profile, repos)
  },
  getProfileUrl: (user?: string) => `https://github.com/${user || GITHUB_USER}`,
}
