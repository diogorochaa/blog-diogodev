import type { Route } from 'next'

import type { BlogPost } from '@/models'

export type PostsFeedProps = {
  posts: BlogPost[]
  currentPage: number
  numbPages: number
  totalPosts: number
  postsPerPage: number
  prevPage: Route
  nextPage: Route
  showProfile?: boolean
  showMainPost?: boolean
}
