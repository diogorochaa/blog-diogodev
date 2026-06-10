import type { ReactNode } from 'react'

export type Category = 'frontend' | 'backend'

export type ExperienceItem = {
  name: string
  startYear: number
  color: string
  category: Category
  icon: ReactNode
  years: number
}
