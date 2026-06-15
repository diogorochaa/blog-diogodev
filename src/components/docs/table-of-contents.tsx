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
      <aside className="sticky top-20 z-20 hidden max-h-[calc(100vh-5rem)] w-full self-start overflow-y-auto overscroll-contain pr-2 sm:top-24 sm:max-h-[calc(100vh-6rem)] lg:block">
        <TocNav
          items={resolvedItems}
          activeId={activeId}
          onNavigate={handleNavigate}
        />
      </aside>

      <div className="lg:hidden">
        <button
          type="button"
          className="fixed bottom-24 right-4 z-40 flex items-center gap-2 rounded-full border border-accent-purple/40 bg-secondary/95 px-4 py-2.5 text-sm font-medium text-white shadow-glow-vivid backdrop-blur-md"
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
              className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
              aria-label="Fechar índice"
              onClick={() => setIsOpen(false)}
            />
            <div
              id={drawerId}
              className="absolute inset-x-0 bottom-0 max-h-[70vh] overflow-y-auto rounded-t-2xl border border-accent-purple/30 bg-secondary/95 p-6 backdrop-blur-lg"
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
