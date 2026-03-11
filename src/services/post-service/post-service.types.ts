export type GetPostAllParams = {
  limit?: number
  currentPage?: number
}

export type PrismicPostData = {
  title?: unknown
  description?: unknown
  content?: unknown
  date?: string | null
  tags?: unknown
}
