import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { PostSearchItem } from '@/models/post-search'

import { useHeaderSearch } from './use-header-search'

const items: PostSearchItem[] = [
  {
    slug: 'mcp-integracao',
    title: 'MCP: O Próximo Passo',
    description: 'O que é MCP e por que desenvolvedores estão falando.',
    tags: ['mcp'],
    date: '2026-06-10',
    readingTime: 3,
  },
  {
    slug: 'nextjs-prismic',
    title: 'Next.js + Prismic',
    description: 'Publicar conteúdo com integrações modernas.',
    tags: ['nextjs'],
    date: '2026-04-12',
    readingTime: 6,
  },
]

describe('useHeaderSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('debounces query before returning results', () => {
    const onNavigate = vi.fn()

    const { result } = renderHook(() => useHeaderSearch({ items, onNavigate }))

    expect(result.current.results).toEqual([])

    act(() => {
      result.current.setQuery('mcp')
    })

    expect(result.current.results).toEqual([])

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(result.current.results).toHaveLength(1)
    expect(result.current.results[0]?.slug).toBe('mcp-integracao')
  })

  it('selects result and clears query', () => {
    const onNavigate = vi.fn()

    const { result } = renderHook(() => useHeaderSearch({ items, onNavigate }))

    act(() => {
      result.current.setQuery('next')
      vi.advanceTimersByTime(200)
    })

    act(() => {
      result.current.selectResult('nextjs-prismic')
    })

    expect(onNavigate).toHaveBeenCalledWith('nextjs-prismic')
    expect(result.current.query).toBe('')
    expect(result.current.isOpen).toBe(false)
  })

  it('clears query on escape', () => {
    const onNavigate = vi.fn()

    const { result } = renderHook(() => useHeaderSearch({ items, onNavigate }))

    act(() => {
      result.current.setQuery('mcp')
      vi.advanceTimersByTime(200)
      result.current.setIsOpen(true)
    })

    act(() => {
      result.current.handleKeyDown({
        key: 'Escape',
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>)
    })

    expect(result.current.query).toBe('')
    expect(result.current.isOpen).toBe(false)
  })
})
