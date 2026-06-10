import type { GithubProfile } from '@/models'

export const GITHUB_USER = 'diogorochaa'
export const GITHUB_API_BASE_URL = 'https://api.github.com'

export const githubFetchOptions = {
  next: { revalidate: 3600 },
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
}

export const profileFallback: GithubProfile = {
  avatar_url: '',
  name: 'Diogo Rocha',
  company: null,
  location: null,
  bio: null,
  public_repos: 0,
  followers: 0,
}
