import type { ImageField, RichTextField } from '@prismicio/client'

export const INTEREST_CATEGORIES = [
  'football',
  'cooking',
  'retro_games',
  'technology',
  'learning',
  'side_projects',
] as const

export type InterestCategory = (typeof INTEREST_CATEGORIES)[number]

export type Interest = {
  id: string
  title: string
  category: InterestCategory
  description: RichTextField
  image: ImageField
  order: number | null
}
