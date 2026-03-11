import { cache } from 'react'

import * as prismic from '@prismicio/client'

import { BlogPost } from '@/models'
import { createClient, hasPrismicConfig } from '@/prismicio'
import { paginationPosts } from '@/utils'

type GetPostAllParams = {
  limit?: number
  currentPage?: number
}

type PrismicPostData = {
  title?: unknown
  description?: unknown
  content?: unknown
  date?: string | null
  tags?: unknown
}

const WORDS_PER_MINUTE = 200
let hasWarnedMissingPrismicConfig = false
let hasWarnedPrismicNetworkFailure = false

const postQuery = {
  orderings: [
    {
      field: 'my.post.date',
      direction: 'desc' as const,
    },
  ],
}

const isPrismicNetworkError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false
  }

  return /timeout|connect|fetch|econn|enotfound|eai_again/i.test(
    `${error.name} ${error.message}`,
  )
}

const getDocumentsWithRetry = async (
  client: ReturnType<typeof createClient>,
) => {
  try {
    return await client.getAllByType('post', postQuery)
  } catch (firstError) {
    if (!isPrismicNetworkError(firstError)) {
      throw firstError
    }

    return await client.getAllByType('post', postQuery)
  }
}

const normalizeTags = (dataTags: unknown, documentTags: string[]) => {
  if (documentTags.length > 0) {
    return documentTags
  }

  if (!Array.isArray(dataTags)) {
    return []
  }

  return dataTags.filter((tag): tag is string => typeof tag === 'string')
}

const getReadingTime = (body: unknown) => {
  const text = prismic.asText(body as prismic.RichTextField).trim()

  if (!text) {
    return 1
  }

  return Math.max(1, Math.ceil(text.split(/\s+/).length / WORDS_PER_MINUTE))
}

const toBlogPost = (document: prismic.PrismicDocument): BlogPost => {
  const data = document.data as PrismicPostData

  const title =
    prismic.asText(data.title as prismic.RichTextField) || 'Sem título'
  const description =
    prismic.asText(data.description as prismic.RichTextField) ||
    'Sem descrição disponível.'
  const body = (data.content ?? []) as prismic.RichTextField

  return {
    slug: document.uid || document.id,
    body,
    readingTime: getReadingTime(body),
    frontmatter: {
      title,
      description,
      date: data.date || document.first_publication_date,
      tags: normalizeTags(data.tags, document.tags),
    },
  }
}

const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  if (!hasPrismicConfig) {
    if (!hasWarnedMissingPrismicConfig) {
      hasWarnedMissingPrismicConfig = true
      console.warn(
        'PRISMIC_REPOSITORY_NAME is missing. Returning an empty post list.',
      )
    }

    return []
  }

  const client = createClient()
  let documents: prismic.PrismicDocument[]

  try {
    documents = await getDocumentsWithRetry(client)
  } catch (error) {
    if (!isPrismicNetworkError(error)) {
      throw error
    }

    if (!hasWarnedPrismicNetworkFailure) {
      hasWarnedPrismicNetworkFailure = true
      const reason =
        error instanceof Error ? `${error.name}: ${error.message}` : 'unknown'
      console.warn(
        `Unable to reach Prismic. Returning an empty post list for now. (${reason})`,
      )
    }

    return []
  }

  return documents.map(toBlogPost)
})

export const PostService = {
  getAll: async ({ limit = 10, currentPage = 1 }: GetPostAllParams = {}) => {
    const posts = await getAllPosts()
    const normalizedLimit = Math.max(1, limit)
    const normalizedCurrentPage = Math.max(1, currentPage)
    const numbPages = Math.max(1, Math.ceil(posts.length / normalizedLimit))
    const paginate = paginationPosts(
      posts,
      normalizedLimit,
      normalizedCurrentPage,
    )

    return {
      posts: paginate,
      numbPages,
      currentPage: normalizedCurrentPage,
      totalPosts: posts.length,
      postsPerPage: normalizedLimit,
    }
  },
  getBySlug: async (slug: string) => {
    const posts = await getAllPosts()
    return posts.find((post) => post.slug === slug)
  },
  getAllSlugs: async () => {
    const posts = await getAllPosts()
    return posts.map((post) => post.slug)
  },
}
