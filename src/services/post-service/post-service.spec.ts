import * as prismic from '@prismicio/client'
import { afterEach, describe, expect, it, vi } from 'vitest'

const makePrismicDoc = ({
  id,
  uid,
  date,
  content,
  tags = [],
  docTags = [],
}: {
  id: string
  uid: string
  date: string
  content: string
  tags?: string[]
  docTags?: string[]
}) => {
  return {
    id,
    uid,
    tags: docTags,
    first_publication_date: date,
    data: {
      title: [{ type: 'heading1', text: `Title ${uid}`, spans: [] }],
      description: [
        { type: 'paragraph', text: `Description ${uid}`, spans: [] },
      ],
      content: [{ type: 'paragraph', text: content, spans: [] }],
      date,
      tags,
    },
  }
}

const loadPostService = async ({
  hasConfig,
  documents,
  getAllByTypeMock,
  getByUIDMock,
}: {
  hasConfig: boolean
  documents: ReturnType<typeof makePrismicDoc>[]
  getAllByTypeMock?: ReturnType<typeof vi.fn>
  getByUIDMock?: ReturnType<typeof vi.fn>
}) => {
  vi.resetModules()

  const getAllByType = getAllByTypeMock ?? vi.fn().mockResolvedValue(documents)
  const getByUID =
    getByUIDMock ??
    vi.fn().mockImplementation((_type: string, uid: string) => {
      const document = documents.find((doc) => doc.uid === uid)

      if (!document) {
        throw new prismic.NotFoundError('Document not found', '', '')
      }

      return Promise.resolve(document)
    })

  vi.doMock('react', async () => {
    const actual = await vi.importActual<typeof import('react')>('react')

    return {
      ...actual,
      cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
    }
  })

  vi.doMock('@/prismicio', () => ({
    hasPrismicConfig: hasConfig,
    createClient: () => ({ getAllByType, getByUID }),
  }))

  const { PostService } = await import('./post-service')

  return { PostService, getAllByType, getByUID }
}

describe('PostService', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
    vi.unstubAllEnvs()
  })

  it('returns paginated posts and page count', async () => {
    const docs = [
      makePrismicDoc({
        id: '1',
        uid: 'post-1',
        date: '2024-01-01',
        content: 'word '.repeat(250),
      }),
      makePrismicDoc({
        id: '2',
        uid: 'post-2',
        date: '2024-01-02',
        content: 'word '.repeat(50),
      }),
      makePrismicDoc({
        id: '3',
        uid: 'post-3',
        date: '2024-01-03',
        content: 'word '.repeat(10),
      }),
    ]

    const { PostService, getAllByType } = await loadPostService({
      hasConfig: true,
      documents: docs,
    })

    const result = await PostService.getAll({ limit: 2, currentPage: 2 })

    expect(getAllByType).toHaveBeenCalledWith('post', {
      orderings: [{ field: 'my.post.date', direction: 'desc' }],
    })
    expect(result.numbPages).toBe(2)
    expect(result.totalPosts).toBe(3)
    expect(result.postsPerPage).toBe(2)
    expect(result.posts).toHaveLength(1)
    expect(result.posts[0].slug).toBe('post-3')
  })

  it('returns post by slug from cached list and all slugs list', async () => {
    const docs = [
      makePrismicDoc({
        id: '1',
        uid: 'post-1',
        date: '2024-01-01',
        content: 'word '.repeat(20),
        docTags: ['frontend'],
      }),
      makePrismicDoc({
        id: '2',
        uid: 'post-2',
        date: '2024-01-02',
        content: 'word '.repeat(10),
      }),
    ]

    const { PostService, getAllByType } = await loadPostService({
      hasConfig: true,
      documents: docs,
    })

    const post = await PostService.getBySlug('post-2')
    const slugs = await PostService.getAllSlugs()

    expect(getAllByType).toHaveBeenCalledWith('post', {
      orderings: [{ field: 'my.post.date', direction: 'desc' }],
    })
    expect(post?.frontmatter.title).toBe('Title post-2')
    expect(slugs).toEqual(['post-1', 'post-2'])
  })

  it('returns undefined when slug is not found', async () => {
    const docs = [
      makePrismicDoc({
        id: '1',
        uid: 'post-1',
        date: '2024-01-01',
        content: 'word '.repeat(20),
      }),
    ]

    const { PostService } = await loadPostService({
      hasConfig: true,
      documents: docs,
    })

    const post = await PostService.getBySlug('missing-post')

    expect(post).toBeUndefined()
  })

  it('returns empty list when Prismic config is missing', async () => {
    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)

    const { PostService, getAllByType } = await loadPostService({
      hasConfig: false,
      documents: [],
    })

    const result = await PostService.getAll()

    expect(getAllByType).not.toHaveBeenCalled()
    expect(result.posts).toEqual([])
    expect(result.numbPages).toBe(1)
    expect(result.totalPosts).toBe(0)
    expect(result.postsPerPage).toBe(10)

    warnSpy.mockRestore()
  })

  it('retries once when Prismic request times out and then succeeds', async () => {
    const docs = [
      makePrismicDoc({
        id: '1',
        uid: 'post-1',
        date: '2024-01-01',
        content: 'word '.repeat(30),
      }),
    ]

    const getAllByType = vi
      .fn()
      .mockRejectedValueOnce(
        new Error('ConnectTimeoutError: Connect Timeout Error'),
      )
      .mockResolvedValueOnce(docs)

    const { PostService } = await loadPostService({
      hasConfig: true,
      documents: docs,
      getAllByTypeMock: getAllByType,
    })

    const result = await PostService.getAll()

    expect(getAllByType).toHaveBeenCalledTimes(2)
    expect(result.totalPosts).toBe(1)
    expect(result.posts[0].slug).toBe('post-1')
  })

  it('returns empty list when Prismic keeps failing with network errors in development', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    const warnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined)

    const getAllByType = vi
      .fn()
      .mockRejectedValue(
        new Error('ConnectTimeoutError: Connect Timeout Error'),
      )

    const { PostService } = await loadPostService({
      hasConfig: true,
      documents: [],
      getAllByTypeMock: getAllByType,
    })

    const result = await PostService.getAll()

    expect(getAllByType).toHaveBeenCalledTimes(3)
    expect(result.posts).toEqual([])
    expect(result.totalPosts).toBe(0)
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to reach Prismic'),
    )

    warnSpy.mockRestore()
  })

  it('throws when Prismic keeps failing with network errors in production', async () => {
    vi.stubEnv('NODE_ENV', 'production')

    const getAllByType = vi
      .fn()
      .mockRejectedValue(
        new Error('ConnectTimeoutError: Connect Timeout Error'),
      )

    const { PostService } = await loadPostService({
      hasConfig: true,
      documents: [],
      getAllByTypeMock: getAllByType,
    })

    await expect(PostService.getAll()).rejects.toThrow('Connect Timeout Error')
    expect(getAllByType).toHaveBeenCalledTimes(3)
  })
})
