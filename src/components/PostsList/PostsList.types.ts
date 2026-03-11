import type { BlogPost } from '@/models'

export type PostsListProps = {
  posts: BlogPost[]
  showMain?: boolean
}
