import type { BlogPost } from '@/models'

export type PostProps = {
  post: BlogPost
  titleId: string
  headingIdsInOrder: string[]
  /** Chronological position of the article (oldest = 1). */
  stage?: number
  totalStages?: number
}
