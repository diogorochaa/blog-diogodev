import type { Route } from 'next'

export type PaginationProps = {
  currentPage: number
  numbPages: number
  totalPosts: number
  postsPerPage: number
  prevPage: Route
  nextPage: Route
}
