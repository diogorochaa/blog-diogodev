import { describe, expect, it } from 'vitest'

import { parseCurrentPage } from './page.data'

describe('parseCurrentPage', () => {
  it('accepts valid integer pages starting at 2', () => {
    expect(parseCurrentPage('2')).toBe(2)
    expect(parseCurrentPage('10')).toBe(10)
  })

  it('rejects non-integer values', () => {
    expect(parseCurrentPage('2.5')).toBeNull()
    expect(parseCurrentPage('abc')).toBeNull()
  })

  it('rejects page 1 and values below 2', () => {
    expect(parseCurrentPage('1')).toBeNull()
    expect(parseCurrentPage('0')).toBeNull()
    expect(parseCurrentPage('-1')).toBeNull()
  })
})
