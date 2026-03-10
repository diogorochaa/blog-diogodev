import { describe, expect, it } from 'vitest'

import { slugify } from './slugify'

describe('slugify', () => {
  it('removes accents and normalizes separators', () => {
    expect(slugify('Introdução à SOLID')).toBe('introducao-a-solid')
  })

  it('removes leading and trailing separators', () => {
    expect(slugify('  ---Hello   World---  ')).toBe('hello-world')
  })
})
