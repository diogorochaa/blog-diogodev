'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import type { PostSearchItem } from '@/models/post-search'
import { searchPosts } from '@/utils/search-posts'

const DEBOUNCE_MS = 200

type UseHeaderSearchOptions = {
  items: PostSearchItem[]
  onNavigate: (slug: string) => void
}

export const useHeaderSearch = ({
  items,
  onNavigate,
}: UseHeaderSearchOptions) => {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const results = useMemo(
    () => searchPosts(items, debouncedQuery),
    [debouncedQuery, items],
  )

  const showSuggestions = isOpen && debouncedQuery.length > 0

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedQuery(query.trim())
    }, DEBOUNCE_MS)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [query])

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1)
  }, [results])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setIsMobileOpen(false)
    setActiveIndex(-1)
  }, [])

  const openMobileSearch = useCallback(() => {
    setIsMobileOpen(true)
    setIsOpen(true)
  }, [])

  const selectResult = useCallback(
    (slug: string) => {
      onNavigate(slug)
      setQuery('')
      setDebouncedQuery('')
      closeSearch()
    },
    [closeSearch, onNavigate],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setQuery('')
        setDebouncedQuery('')
        closeSearch()
        return
      }

      if (!showSuggestions || results.length === 0) {
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((current) => (current + 1) % results.length)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((current) =>
          current <= 0 ? results.length - 1 : current - 1,
        )
        return
      }

      if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault()
        const selected = results[activeIndex]

        if (selected) {
          selectResult(selected.slug)
        }
      }
    },
    [activeIndex, closeSearch, results, selectResult, showSuggestions],
  )

  return {
    query,
    setQuery,
    results,
    isOpen,
    setIsOpen,
    isMobileOpen,
    setIsMobileOpen,
    activeIndex,
    setActiveIndex,
    showSuggestions,
    closeSearch,
    openMobileSearch,
    selectResult,
    handleKeyDown,
  }
}
