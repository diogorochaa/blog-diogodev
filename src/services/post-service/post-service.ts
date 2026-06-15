import * as prismic from '@prismicio/client'
import { cache } from 'react'

import type { BlogPost } from '@/models'
import { createClient, hasPrismicConfig } from '@/prismicio'
import { paginationPosts } from '@/utils'

import type { GetPostAllParams, PrismicPostData } from './post-service.types'

const WORDS_PER_MINUTE = 200
const PRISMIC_MAX_ATTEMPTS = 3
const PRISMIC_RETRY_DELAY_MS = 500
let hasWarnedMissingPrismicConfig = false
let hasWarnedPrismicNetworkFailure = false

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })

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

const shouldFailOnNetworkError = () =>
  process.env.NODE_ENV === 'production' && hasPrismicConfig

const getDocumentsWithRetry = async (
  client: ReturnType<typeof createClient>,
) => {
  let lastError: unknown

  for (let attempt = 1; attempt <= PRISMIC_MAX_ATTEMPTS; attempt++) {
    try {
      return await client.getAllByType('post', postQuery)
    } catch (error) {
      lastError = error

      if (!isPrismicNetworkError(error) || attempt === PRISMIC_MAX_ATTEMPTS) {
        throw error
      }

      await sleep(PRISMIC_RETRY_DELAY_MS * attempt)
    }
  }

  throw lastError
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

    if (shouldFailOnNetworkError()) {
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
    if (!hasPrismicConfig) {
      return undefined
    }

    const posts = await getAllPosts()
    const fromList = posts.find((post) => post.slug === slug)

    if (fromList) {
      return fromList
    }

    const client = createClient()

    try {
      const document = await client.getByUID('post', slug)
      return toBlogPost(document)
    } catch (error) {
      if (error instanceof prismic.NotFoundError) {
        return undefined
      }

      if (isPrismicNetworkError(error) && shouldFailOnNetworkError()) {
        throw error
      }

      throw error
    }
  },
  getAllSlugs: async () => {
    const posts = await getAllPosts()
    return posts.map((post) => post.slug)
  },
  getSearchIndex: async () => {
    const posts = await getAllPosts()

    return posts.map((post) => ({
      slug: post.slug,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      tags: post.frontmatter.tags,
      date: post.frontmatter.date,
      readingTime: post.readingTime,
    }))
  },
}
