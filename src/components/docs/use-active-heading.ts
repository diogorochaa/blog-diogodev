'use client'

import { useEffect, useState } from 'react'

const HEADER_OFFSET = 96

type UseActiveHeadingOptions = {
  containerId?: string
  headingIds: string[]
}

const getActiveHeadingId = (headingIds: string[], scrollLine: number) => {
  let activeId = headingIds[0]

  for (const id of headingIds) {
    const element = document.getElementById(id)

    if (!element) {
      continue
    }

    if (element.getBoundingClientRect().top <= scrollLine) {
      activeId = id
    }
  }

  return activeId
}

export const useActiveHeading = ({
  containerId = 'post-content',
  headingIds,
}: UseActiveHeadingOptions) => {
  const [activeId, setActiveId] = useState<string | null>(headingIds[0] ?? null)

  useEffect(() => {
    if (!headingIds.length) {
      return
    }

    const container = document.getElementById(containerId)

    if (!container) {
      return
    }

    const hash = window.location.hash.replace('#', '')

    if (hash && headingIds.includes(hash)) {
      const target = document.getElementById(hash)

      if (target) {
        window.history.replaceState(
          null,
          '',
          `${window.location.pathname}${window.location.search}`,
        )

        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        setActiveId(hash)
      }
    }

    let ticking = false

    const updateActiveHeading = () => {
      const nextId = getActiveHeadingId(headingIds, HEADER_OFFSET)

      setActiveId((current) => (current === nextId ? current : nextId))
      ticking = false
    }

    const onScroll = () => {
      if (ticking) {
        return
      }

      ticking = true
      requestAnimationFrame(updateActiveHeading)
    }

    updateActiveHeading()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [containerId, headingIds])

  return activeId
}
