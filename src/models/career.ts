import type { RichTextField } from '@prismicio/client'

export type CareerEntry = {
  id: string
  company: string
  role: string
  stageLabel: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: RichTextField
  responsibilities: RichTextField
  highlights: string[]
  technologies: string[]
  order: number | null
}
