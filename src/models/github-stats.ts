export type GithubLanguageStat = {
  name: string
  repos: number
}

export type GithubStats = {
  /** False when the GitHub API could not be reached or returned invalid data. */
  isAvailable: boolean
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  topLanguages: GithubLanguageStat[]
}
