export type ExperienceCategory = 'frontend' | 'backend'

export type ExperienceIconKey =
  | 'javascript'
  | 'typescript'
  | 'css'
  | 'html'
  | 'react'
  | 'nextjs'
  | 'nodejs'
  | 'docker'
  | 'database'
  | 'cloud'
  | 'git'
  | 'terminal'
  | 'code'

export type ExperienceContentEntry = {
  name: string
  startYear: number
  color: string
  category: ExperienceCategory
  iconKey: ExperienceIconKey
}
