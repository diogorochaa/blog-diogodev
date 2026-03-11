import { describe, expect, it } from 'vitest'

import { formatYears, getCurrentYear, getYearsSince } from './years'

describe('years', () => {
  it('returns the year from a provided date', () => {
    expect(getCurrentYear(new Date('2026-03-11T12:00:00Z'))).toBe(2026)
  })

  it('calculates elapsed years from a start year', () => {
    expect(getYearsSince(2019, 2026)).toBe(7)
  })

  it('does not return negative elapsed years', () => {
    expect(getYearsSince(2030, 2026)).toBe(0)
  })

  it('formats years using singular and plural labels', () => {
    expect(formatYears(1)).toBe('1 ano')
    expect(formatYears(7)).toBe('7 anos')
  })
})
