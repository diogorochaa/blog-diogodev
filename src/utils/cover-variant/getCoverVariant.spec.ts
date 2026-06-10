import { describe, expect, it } from 'vitest'

import { getCoverVariant } from './getCoverVariant'

describe('getCoverVariant', () => {
  it('returns a stable variant for the same slug', () => {
    expect(getCoverVariant('meu-post')).toBe(getCoverVariant('meu-post'))
  })

  it('returns one of the supported variants', () => {
    expect(['aurora', 'solar', 'neon', 'ember']).toContain(
      getCoverVariant('outro-post'),
    )
  })
})
