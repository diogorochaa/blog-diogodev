import type { ImageField, RichTextField } from '@prismicio/client'

export const PROJECT_STATUSES = [
  'in_progress',
  'completed',
  'archived',
] as const

export type ProjectStatus = (typeof PROJECT_STATUSES)[number]

export type ProjectGalleryItem = {
  image: ImageField
  caption: string
}

export type Project = {
  uid: string
  title: string
  shortDescription: string
  description: RichTextField
  coverImage: ImageField
  gallery: ProjectGalleryItem[]
  status: ProjectStatus
  featured: boolean
  order: number | null
  category: string
  technologies: string[]
  githubUrl: string
  demoUrl: string
  problem: RichTextField
  solution: RichTextField
  architecture: RichTextField
  technicalDecisions: RichTextField
  technicalChallenges: RichTextField
  learnings: RichTextField
}
