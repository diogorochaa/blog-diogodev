import type { Route } from 'next'

/**
 * Page 1 lives at `basePath`; the following pages at `basePath/page/N`.
 */
export const paginationPages = (currentPage = 1, basePath = '/blog') => {
  const normalizedPage = Math.max(1, currentPage)

  const prevPage =
    normalizedPage <= 2
      ? (basePath as Route)
      : (`${basePath}/page/${normalizedPage - 1}` as Route)
  const nextPage = `${basePath}/page/${normalizedPage + 1}` as Route

  return {
    prevPage,
    nextPage,
  }
}
