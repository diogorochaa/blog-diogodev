import type { PostSearchItem } from '@/models/post-search'

import { normalizeSearchText } from './normalizeSearchText'

const DEFAULT_LIMIT = 6

const getMatchScore = (item: PostSearchItem, normalizedQuery: string) => {
  const title = normalizeSearchText(item.title)
  const description = normalizeSearchText(item.description)
  const tags = item.tags.map(normalizeSearchText)

  let score = 0

  if (title.includes(normalizedQuery)) {
    score += 3
  }

  if (description.includes(normalizedQuery)) {
    score += 2
  }

  if (tags.some((tag) => tag.includes(normalizedQuery))) {
    score += 1
  }

  return score
}

export const searchPosts = (
  items: PostSearchItem[],
  query: string,
  limit = DEFAULT_LIMIT,
) => {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return []
  }

  return items
    .map((item) => ({
      item,
      score: getMatchScore(item, normalizedQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      return new Date(b.item.date).getTime() - new Date(a.item.date).getTime()
    })
    .slice(0, limit)
    .map(({ item }) => item)
}
