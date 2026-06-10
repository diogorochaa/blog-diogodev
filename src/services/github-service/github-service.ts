import type { GithubProfile, Repo } from '@/models'

import {
  GITHUB_API_BASE_URL,
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

export const GithubService = {
  getProfile: async (): Promise<GithubProfile> => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}`,
        githubFetchOptions,
      )

      if (!response.ok) {
        return profileFallback
      }

      const data: unknown = await response.json()

      return isGithubProfile(data) ? data : profileFallback
    } catch {
      return profileFallback
    }
  },
  getRepos: async (): Promise<Repo[]> => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}/repos?sort=updated&per_page=6`,
        githubFetchOptions,
      )

      if (!response.ok) {
        return []
      }

      const data: unknown = await response.json()

      return isRepoArray(data) ? data : []
    } catch {
      return []
    }
  },
}
