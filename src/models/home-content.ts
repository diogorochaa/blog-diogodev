import type { PrismicSlice } from '@/slices/slice.types'

export type HomeContent = {
  heroBadge: string
  title: string
  subtitle: string
  description: string
  featuredPostsLimit: number
  slices: PrismicSlice[]
  ogTitle: string
  ogDescription: string
}
