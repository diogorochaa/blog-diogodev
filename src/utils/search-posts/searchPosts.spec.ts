import { describe, expect, it } from 'vitest'

import type { PostSearchItem } from '@/models/post-search'

import { searchPosts } from './searchPosts'

const sampleItems: PostSearchItem[] = [
  {
    slug: 'mcp-integracao',
    title: 'MCP: O Próximo Passo para Integrar IA',
    description:
      'O que é MCP e por que desenvolvedores estão falando sobre isso.',
    tags: ['mcp', 'ia'],
    date: '2026-06-10',
    readingTime: 3,
  },
  {
    slug: 'reutilizacao-apis',
    title: 'Reutilização de APIs em sistemas distribuídos',
    description: 'Padrões para reduzir acoplamento entre serviços.',
    tags: ['arquitetura'],
    date: '2026-05-01',
    readingTime: 5,
  },
  {
    slug: 'nextjs-prismic',
    title: 'Next.js + Prismic na prática',
    description: 'Como publicar conteúdo com MCP e integrações modernas.',
    tags: ['nextjs', 'prismic'],
    date: '2026-04-12',
    readingTime: 6,
  },
]

describe('searchPosts', () => {
  it('returns empty array for empty query', () => {
    expect(searchPosts(sampleItems, '')).toEqual([])
    expect(searchPosts(sampleItems, '   ')).toEqual([])
  })

  it('matches title without accents', () => {
    const results = searchPosts(sampleItems, 'reutilizacao')

    expect(results).toHaveLength(1)
    expect(results[0]?.slug).toBe('reutilizacao-apis')
  })

  it('matches description and tags', () => {
    expect(searchPosts(sampleItems, 'acoplamento')[0]?.slug).toBe(
      'reutilizacao-apis',
    )
    expect(searchPosts(sampleItems, 'prismic')[0]?.slug).toBe('nextjs-prismic')
  })

  it('prioritizes title matches over description matches', () => {
    const results = searchPosts(sampleItems, 'mcp')

    expect(results[0]?.slug).toBe('mcp-integracao')
  })

  it('limits results', () => {
    expect(searchPosts(sampleItems, 'a', 2)).toHaveLength(2)
  })

  it('returns empty array when nothing matches', () => {
    expect(searchPosts(sampleItems, 'graphql')).toEqual([])
  })
})
