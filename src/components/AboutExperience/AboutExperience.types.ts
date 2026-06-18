import type { ReactNode } from 'react'

import type { ExperienceCategory } from '@/models'

export type Category = ExperienceCategory

export type ExperienceItem = {
  name: string
  startYear: number
  color: string
  category: Category
  icon: ReactNode
  years: number
}

export type AboutExperienceProps = {
  heading: string
  description: string
  showCharts?: boolean
  items: Array<{
    name: string
    startYear: number
    color: string
    category: Category
    iconKey: string
  }>
}
