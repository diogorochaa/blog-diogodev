import type { Route } from 'next'

export const paginationPages = (currentPage = 1, pageRoute = '/page') => {
  const normalizedPage = Math.max(1, currentPage)

  const prevPage =
    normalizedPage <= 2
      ? ('/' as Route)
      : (`${pageRoute}/${normalizedPage - 1}` as Route)
  const nextPage = `${pageRoute}/${normalizedPage + 1}` as Route

  return {
    prevPage,
    nextPage,
  }
}
