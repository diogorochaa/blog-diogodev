export type ExperienceCategory = 'frontend' | 'backend'

export type ExperienceIconKey = string

export type ExperienceContentEntry = {
  name: string
  startYear: number
  color: string
  category: ExperienceCategory
  iconKey: ExperienceIconKey
  /** Optional 0-99 visual level edited in Prismic; not an objective metric. */
  level?: number
}
