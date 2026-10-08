import type { GithubStats } from '@/models'

export type GitHubStatsViewProps = {
  stats: GithubStats
  profileUrl: string
}

export type GitHubStatsProps = {
  username?: string
}
