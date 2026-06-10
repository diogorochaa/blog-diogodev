import { describe, expect, it } from 'vitest'

import { formatDate, toIsoDate } from './formatDate'

describe('formatDate', () => {
  it('formats date using pt-BR long style', () => {
    const input = '2024-03-10'
    const expected = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(new Date(input))

    expect(formatDate(input)).toBe(expected)
  })

  it('returns fallback label for invalid dates', () => {
    expect(formatDate('invalid-date')).toBe('Data indisponível')
  })
})

describe('toIsoDate', () => {
  it('returns ISO string for valid dates', () => {
    expect(toIsoDate('2024-03-10')).toBe(new Date('2024-03-10').toISOString())
  })

  it('returns undefined for invalid dates', () => {
    expect(toIsoDate('invalid-date')).toBeUndefined()
  })
})
