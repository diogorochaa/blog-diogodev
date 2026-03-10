export type Profile = {
  avatar_url: string
  name: string
  company: string | null
  location: string | null
  bio: string | null
  public_repos: number
  followers: number
}

export type Repo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
}
