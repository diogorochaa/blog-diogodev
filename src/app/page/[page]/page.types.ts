import type { Route } from 'next'

import { BlogPost } from '@/models'

export type PagedPostsContentProps = {
  posts: BlogPost[]
  currentPage: number
  numbPages: number
  totalPosts: number
  postsPerPage: number
  prevPage: Route
  nextPage: Route
}
