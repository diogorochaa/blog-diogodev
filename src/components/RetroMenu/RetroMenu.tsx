'use client'

import type { Route } from 'next'
import NextLink from 'next/link'
import { type KeyboardEvent, useRef } from 'react'

import { PixelSprite } from '@/components/PixelSprite'

import type { RetroMenuProps } from './RetroMenu.types'

const NAVIGATION_KEYS = new Set(['ArrowDown', 'ArrowUp', 'Home', 'End'])

const getNextIndex = (key: string, current: number, total: number) => {
  switch (key) {
    case 'ArrowDown':
      return (current + 1) % total
    case 'ArrowUp':
      return (current - 1 + total) % total
    case 'Home':
      return 0
    default:
      return total - 1
  }
}

export const RetroMenu = ({
  items,
  ariaLabel,
  className = '',
}: RetroMenuProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!NAVIGATION_KEYS.has(event.key)) {
      return
    }

    const links = Array.from(
      listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [],
    )
    const current = links.indexOf(document.activeElement as HTMLAnchorElement)

    if (current === -1) {
      return
    }

    event.preventDefault()
    links[getNextIndex(event.key, current, links.length)]?.focus()
  }

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul
        ref={listRef}
        onKeyDown={handleKeyDown}
        className="flex flex-col gap-1"
      >
        {items.map((item) => {
          const isExternal = /^https?:\/\//.test(item.href)

          const content = (
            <>
              <span className="flex w-3 shrink-0 justify-center opacity-0 transition-opacity duration-75 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:animate-blink">
                <PixelSprite name="cursor" scale={2} />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <span className="pixel-label text-xs text-ink transition-colors group-hover:text-accent group-focus-visible:text-accent">
                  {item.label}
                </span>
                <span className="text-sm text-muted">{item.hint}</span>
              </span>
            </>
          )

          const linkClassName =
            'group flex min-h-11 items-center gap-3 border-2 border-transparent px-3 py-2 transition-colors hover:border-line hover:bg-surface-2 focus-visible:border-accent focus-visible:bg-surface-2 focus-visible:outline-none'

          return (
            <li key={item.label}>
              {isExternal ? (
                <a
                  className={linkClassName}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <NextLink className={linkClassName} href={item.href as Route}>
                  {content}
                </NextLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
