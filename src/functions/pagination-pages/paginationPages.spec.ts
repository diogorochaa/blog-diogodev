import { describe, expect, it } from 'vitest'

import { paginationPages } from './paginationPages'

describe('paginationPages', () => {
  it('returns home as previous page when current page is first', () => {
    expect(paginationPages(1)).toEqual({
      prevPage: '/',
      nextPage: '/page/2',
    })
  })

  it('returns previous and next for middle pages', () => {
    expect(paginationPages(4)).toEqual({
      prevPage: '/page/3',
      nextPage: '/page/5',
    })
  })

  it('normalizes invalid page values', () => {
    expect(paginationPages(0)).toEqual({
      prevPage: '/',
      nextPage: '/page/2',
    })
  })
})
