export type ExperienceCategory = 'frontend' | 'backend'

export type ExperienceIconKey = string

export type ExperienceContentEntry = {
  name: string
  startYear: number
  color: string
  category: ExperienceCategory
  iconKey: ExperienceIconKey
}
