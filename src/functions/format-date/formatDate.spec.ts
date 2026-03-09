import { describe, expect, it } from 'vitest'

import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats date using pt-BR long style', () => {
    const input = '2024-03-10'
    const expected = new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    }).format(new Date(input))

    expect(formatDate(input)).toBe(expected)
  })
})
