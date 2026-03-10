import { describe, expect, it } from 'vitest'

import { BlogPost } from '@/models'

import { paginationPosts } from './paginationPosts'

const makePost = (slug: string): BlogPost => ({
  slug,
  readingTime: 1,
  body: [],
  frontmatter: {
    title: slug,
    description: slug,
    date: '2024-01-01',
    tags: [],
  },
})

describe('paginationPosts', () => {
  it('returns first page by default', () => {
    const posts = [makePost('a'), makePost('b'), makePost('c')]

    expect(paginationPosts(posts, 2)).toEqual([makePost('a'), makePost('b')])
  })

  it('returns sliced posts for requested page', () => {
    const posts = [makePost('a'), makePost('b'), makePost('c')]

    expect(paginationPosts(posts, 2, 2)).toEqual([makePost('c')])
  })
})
