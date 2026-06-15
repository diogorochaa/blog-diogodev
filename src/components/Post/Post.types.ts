import type { BlogPost } from '@/models'

export type PostProps = {
  post: BlogPost
  titleId: string
  headingIdsInOrder: string[]
}
