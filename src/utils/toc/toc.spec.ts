import type { RichTextField } from '@prismicio/client'
import { describe, expect, it } from 'vitest'

import { buildPostTocItems } from './buildPostTocItems'
import { extractTocFromRichText } from './extractTocFromRichText'

const sampleBody: RichTextField = [
  { type: 'heading2', text: 'Conceitos de MCP', spans: [] },
  { type: 'heading3', text: 'Participantes', spans: [] },
  { type: 'heading3', text: 'Camadas', spans: [] },
  { type: 'heading4', text: 'Camada de dados', spans: [] },
  { type: 'paragraph', text: 'Texto', spans: [] },
  { type: 'heading2', text: 'Exemplo', spans: [] },
]

describe('extractTocFromRichText', () => {
  it('extracts heading hierarchy with unique ids', () => {
    const { bodyTocItems, headingIdsInOrder } =
      extractTocFromRichText(sampleBody)

    expect(bodyTocItems).toEqual([
      { id: 'conceitos-de-mcp', text: 'Conceitos de MCP', level: 3 },
      { id: 'participantes', text: 'Participantes', level: 4 },
      { id: 'camadas', text: 'Camadas', level: 4 },
      { id: 'camada-de-dados', text: 'Camada de dados', level: 4 },
      { id: 'exemplo', text: 'Exemplo', level: 3 },
    ])
    expect(headingIdsInOrder).toHaveLength(5)
  })

  it('returns empty arrays for empty field', () => {
    expect(extractTocFromRichText([])).toEqual({
      headingIdsInOrder: [],
      bodyTocItems: [],
    })
  })
})

describe('buildPostTocItems', () => {
  it('prepends post title as level 1 using slug as id', () => {
    const result = buildPostTocItems({
      title: 'Escopo',
      slug: 'escopo',
      body: sampleBody,
    })

    expect(result.titleId).toBe('escopo')
    expect(result.items[0]).toEqual({
      id: 'escopo',
      text: 'Escopo',
      level: 1,
    })
    expect(result.items).toHaveLength(6)
  })
})
