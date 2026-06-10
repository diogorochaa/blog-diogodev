import type { Category } from '@/components/AboutExperience/AboutExperience.types'

export type ExperienceIconKey =
  | 'javascript'
  | 'css'
  | 'html'
  | 'react'
  | 'nextjs'
  | 'nodejs'
  | 'docker'

export type ExperienceEntry = {
  name: string
  startYear: number
  color: string
  category: Category
  iconKey: ExperienceIconKey
}

export const experienceEntries: ExperienceEntry[] = [
  {
    name: 'JavaScript',
    startYear: 2019,
    color: '#facc15',
    category: 'frontend',
    iconKey: 'javascript',
  },
  {
    name: 'CSS',
    startYear: 2019,
    color: '#38bdf8',
    category: 'frontend',
    iconKey: 'css',
  },
  {
    name: 'HTML',
    startYear: 2019,
    color: '#fb923c',
    category: 'frontend',
    iconKey: 'html',
  },
  {
    name: 'React',
    startYear: 2020,
    color: '#22d3ee',
    category: 'frontend',
    iconKey: 'react',
  },
  {
    name: 'Next.js',
    startYear: 2021,
    color: '#f8fafc',
    category: 'frontend',
    iconKey: 'nextjs',
  },
  {
    name: 'Node.js',
    startYear: 2022,
    color: '#4ade80',
    category: 'backend',
    iconKey: 'nodejs',
  },
  {
    name: 'Docker',
    startYear: 2023,
    color: '#3b82f6',
    category: 'backend',
    iconKey: 'docker',
  },
]
