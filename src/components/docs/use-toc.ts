'use client'

import { useCallback, useEffect, useState } from 'react'

import type { TocItem } from '@/utils/toc'

type UseTocOptions = {
  items: TocItem[]
  containerId?: string
}

export const useToc = ({
  items,
  containerId = 'post-content',
}: UseTocOptions) => {
  const [resolvedItems, setResolvedItems] = useState(items)

  useEffect(() => {
    const container = document.getElementById(containerId)

    if (!container) {
      setResolvedItems(items)
      return
    }

    const domItems: TocItem[] = []

    for (const item of items) {
      const element = container.querySelector<HTMLElement>(
        `#${CSS.escape(item.id)}`,
      )

      if (element) {
        domItems.push(item)
      }
    }

    setResolvedItems(domItems.length > 0 ? domItems : items)
  }, [containerId, items])

  return resolvedItems
}

export const clearUrlHash = () => {
  if (!window.location.hash) {
    return
  }

  window.history.replaceState(
    null,
    '',
    `${window.location.pathname}${window.location.search}`,
  )
}

export const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)

  if (!element) {
    return
  }

  clearUrlHash()
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export const useTocNavigation = () => {
  return useCallback((id: string) => {
    scrollToHeading(id)
  }, [])
}
