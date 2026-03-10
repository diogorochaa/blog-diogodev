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
}: {
  hasConfig: boolean
  documents: ReturnType<typeof makePrismicDoc>[]
}) => {
  vi.resetModules()

  const getAllByType = vi.fn().mockResolvedValue(documents)

  vi.doMock('react', async () => {
    const actual = await vi.importActual<typeof import('react')>('react')

    return {
      ...actual,
      cache: <T extends (...args: unknown[]) => unknown>(fn: T) => fn,
    }
  })

  vi.doMock('@/prismicio', () => ({
    hasPrismicConfig: hasConfig,
    createClient: () => ({ getAllByType }),
  }))

  const { PostService } = await import('./post-service')

  return { PostService, getAllByType }
}

describe('PostService', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
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

  it('returns post by slug and all slugs list', async () => {
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

    const { PostService } = await loadPostService({
      hasConfig: true,
      documents: docs,
    })

    const post = await PostService.getBySlug('post-2')
    const slugs = await PostService.getAllSlugs()

    expect(post?.frontmatter.title).toBe('Title post-2')
    expect(slugs).toEqual(['post-1', 'post-2'])
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
})
