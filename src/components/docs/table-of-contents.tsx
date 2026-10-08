'use client'

import { List, X } from '@phosphor-icons/react'
import { useEffect, useId, useRef, useState } from 'react'

import type { TocItem as TocItemType } from '@/utils/toc'

import { TocNav } from './toc-item'
import { useActiveHeading } from './use-active-heading'
import { useToc, useTocNavigation } from './use-toc'

type TableOfContentsProps = {
  items: TocItemType[]
  containerId?: string
}

export const TableOfContents = ({
  items,
  containerId = 'post-content',
}: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const drawerId = useId()
  const drawerNavRef = useRef<HTMLElement>(null)
  const resolvedItems = useToc({ items, containerId })
  const headingIds = resolvedItems.map((item) => item.id)
  const activeId = useActiveHeading({ containerId, headingIds })
  const navigate = useTocNavigation()

  const handleNavigate = (id: string) => {
    navigate(id)
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    const firstLink = drawerNavRef.current?.querySelector<HTMLButtonElement>(
      'button[type="button"]',
    )
    firstLink?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (resolvedItems.length < 2) {
    return null
  }

  return (
    <>
      <aside className="sticky top-24 z-20 hidden max-h-[calc(100vh-7rem)] w-full self-start overflow-y-auto overscroll-contain border-2 border-line-strong bg-bg p-4 lg:block">
        <TocNav
          items={resolvedItems}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          className="pixel-label fixed right-4 bottom-24 z-40 flex min-h-11 items-center gap-2 border-2 border-line-strong bg-surface px-4 text-[10px] text-ink shadow-pixel"
          aria-expanded={isOpen}
          aria-controls={drawerId}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X size={18} /> : <List size={18} />}
          Nesta página
        </button>

        {isOpen ? (
          <div className="fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-bg/80"
              aria-label="Fechar índice"
              onClick={() => setIsOpen(false)}
            />
            <div
              id={drawerId}
              className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto border-t-2 border-line-strong bg-surface p-6"
            >
              <TocNav
                ref={drawerNavRef}
                items={resolvedItems}
                activeId={activeId}
                onNavigate={handleNavigate}
              />
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
