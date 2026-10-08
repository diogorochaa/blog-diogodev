import type { BlogPost } from '@/models'

export type ArticleCardProps = {
  post: BlogPost
  /** Chronological position of the post: the first article is stage 1. */
  stage: number
  headingLevel?: 'h2' | 'h3'
}
