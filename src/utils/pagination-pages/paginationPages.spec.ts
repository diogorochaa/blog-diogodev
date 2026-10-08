import { describe, expect, it } from 'vitest'

import { paginationPages } from './paginationPages'

describe('paginationPages', () => {
  it('returns the blog index as previous page when current page is first', () => {
    expect(paginationPages(1)).toEqual({
      prevPage: '/blog',
      nextPage: '/blog/page/2',
    })
  })

  it('returns the blog index as previous page from page 2', () => {
    expect(paginationPages(2)).toEqual({
      prevPage: '/blog',
      nextPage: '/blog/page/3',
    })
  })

  it('returns previous and next for middle pages', () => {
    expect(paginationPages(4)).toEqual({
      prevPage: '/blog/page/3',
      nextPage: '/blog/page/5',
    })
  })

  it('supports a custom base path', () => {
    expect(paginationPages(3, '/blog/tag/react')).toEqual({
      prevPage: '/blog/tag/react/page/2',
      nextPage: '/blog/tag/react/page/4',
    })
  })

  it('normalizes invalid page values', () => {
    expect(paginationPages(0)).toEqual({
      prevPage: '/blog',
      nextPage: '/blog/page/2',
    })
  })
})
