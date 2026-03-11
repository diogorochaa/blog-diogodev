import type { ReactNode } from 'react'

export type Category = 'frontend' | 'backend'

export type ExperienceMeta = {
  name: string
  startYear: number
  color: string
  category: Category
  icon: ReactNode
}

export type ExperienceItem = ExperienceMeta & { years: number }
