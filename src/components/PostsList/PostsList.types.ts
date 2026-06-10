import type { BlogPost } from '@/models'

export type PostsListLayout = 'home' | 'grid'

export type PostsListProps = {
  posts: BlogPost[]
  layout?: PostsListLayout
  /** @deprecated Use layout="home" instead */
  showMain?: boolean
}
