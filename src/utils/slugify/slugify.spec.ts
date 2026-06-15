import { describe, expect, it } from 'vitest'

import { createUniqueSlug, slugify } from './slugify'

describe('slugify', () => {
  it('normalizes accents and spaces', () => {
    expect(slugify('Conceitos de MCP')).toBe('conceitos-de-mcp')
    expect(slugify('Camada de Dados')).toBe('camada-de-dados')
  })

  it('returns empty string for non-alphanumeric input', () => {
    expect(slugify('!!!')).toBe('')
  })
})

describe('createUniqueSlug', () => {
  it('deduplicates slugs with numeric suffix', () => {
    const used = new Map<string, number>()

    expect(createUniqueSlug('Conceitos de MCP', used)).toBe('conceitos-de-mcp')
    expect(createUniqueSlug('Conceitos de MCP', used)).toBe(
      'conceitos-de-mcp-2',
    )
  })
})
