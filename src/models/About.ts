export type Profile = {
  avatar_url: string
  name: string
  company: string
  location: string
}

export type Repo = {
  id: number
  name: string
  description: string
  html_url: string
}

export type Repos = {
  repositories: Repo[]
}
