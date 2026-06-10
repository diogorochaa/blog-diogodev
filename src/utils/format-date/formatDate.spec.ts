import { describe, expect, it } from 'vitest'

import { formatDate, toIsoDate } from './formatDate'

describe('formatDate', () => {
  it('formats Prismic date-only values without timezone shift', () => {
    expect(formatDate('2026-06-10')).toBe('10 de junho de 2026')
  })

  it('formats datetime values using pt-BR long style', () => {
    const input = '2024-03-10T15:30:00.000Z'
    const expected = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(new Date(input))

    expect(formatDate(input)).toBe(expected)
  })

  it('returns fallback label for invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('Data indisponível')
    expect(formatDate('2026-13-40')).toBe('Data indisponível')
  })
})

describe('toIsoDate', () => {
  it('returns YYYY-MM-DD for Prismic date-only values', () => {
    expect(toIsoDate('2026-06-10')).toBe('2026-06-10')
  })

  it('returns ISO string for datetime values', () => {
    expect(toIsoDate('2024-03-10T15:30:00.000Z')).toBe(
      '2024-03-10T15:30:00.000Z',
    )
  })

  it('returns undefined for invalid dates', () => {
    expect(toIsoDate('invalid-date')).toBeUndefined()
  })
})
