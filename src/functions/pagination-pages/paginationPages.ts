export const paginationPages = (currentPage = 1, pageRoute = '/page') => {
  const normalizedPage = Math.max(1, currentPage)

  const prevPage =
    normalizedPage <= 2 ? '/' : `${pageRoute}/${normalizedPage - 1}`
  const nextPage = `${pageRoute}/${normalizedPage + 1}`

  return {
    prevPage,
    nextPage,
  }
}
