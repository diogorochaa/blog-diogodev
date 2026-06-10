import type { BlogPost } from '@/models'

export type PostCardVariant = 'carousel' | 'grid'

export type PostCardProps = {
  post: BlogPost
  variant?: PostCardVariant
  /** @deprecated Use variant instead */
  isMain?: boolean
}
