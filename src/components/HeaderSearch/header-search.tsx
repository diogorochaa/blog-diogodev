'use client'

import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef } from 'react'
import type { HeaderSearchProps } from './HeaderSearch.types'
import { SearchSuggestions } from './search-suggestions'
import { useHeaderSearch } from './use-header-search'

const SearchField = ({
  inputRef,
  listboxId,
  query,
  activeDescendantId,
  isExpanded,
  onChange,
  onFocus,
  onKeyDown,
  className = '',
  showShortcut = true,
}: {
  inputRef: React.RefObject<HTMLInputElement | null>
  listboxId: string
  query: string
  activeDescendantId?: string
  isExpanded: boolean
  onChange: (value: string) => void
  onFocus: () => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  className?: string
  showShortcut?: boolean
}) => {
  return (
    <div className={`relative ${className}`}>
      <MagnifyingGlass
        size={18}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
        aria-hidden
      />

      <input
        ref={inputRef}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isExpanded}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendantId}
        placeholder="Procurar..."
        value={query}
        aria-label="Procurar artigos"
        className="min-h-11 w-full border-2 border-line bg-surface py-2 pr-20 pl-10 text-sm text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
        onChange={(event) => onChange(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />

      {showShortcut ? (
        <kbd className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 border-2 border-line bg-bg px-1.5 py-0.5 font-pixel text-[8px] text-muted sm:inline">
          Ctrl K
        </kbd>
      ) : null}
    </div>
  )
}

export const HeaderSearch = ({ items }: HeaderSearchProps) => {
  const router = useRouter()
  const listboxId = useId()
  const desktopInputRef = useRef<HTMLInputElement>(null)
  const mobileInputRef = useRef<HTMLInputElement>(null)

  const {
    query,
    setQuery,
    results,
    setIsOpen,
    isMobileOpen,
    activeIndex,
    setActiveIndex,
    showSuggestions,
    closeSearch,
    openMobileSearch,
    selectResult,
    handleKeyDown,
  } = useHeaderSearch({
    items,
    onNavigate: (slug) => router.push(`/blog/${slug}`),
  })

  const activeDescendantId =
    activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()

        if (window.matchMedia('(min-width: 1024px)').matches) {
          desktopInputRef.current?.focus()
          setIsOpen(true)
          return
        }

        openMobileSearch()
        window.requestAnimationFrame(() => {
          mobileInputRef.current?.focus()
        })
      }
    }

    window.addEventListener('keydown', handleShortcut)

    return () => {
      window.removeEventListener('keydown', handleShortcut)
    }
  }, [openMobileSearch, setIsOpen])

  useEffect(() => {
    if (!isMobileOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSearch()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeSearch, isMobileOpen])

  return (
    <div className="min-w-0 justify-self-end lg:justify-self-stretch">
      <div className="relative hidden min-w-0 lg:block">
        <SearchField
          inputRef={desktopInputRef}
          listboxId={listboxId}
          query={query}
          activeDescendantId={activeDescendantId}
          isExpanded={showSuggestions}
          onChange={setQuery}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />

        {showSuggestions ? (
          <div className="absolute top-[calc(100%+0.5rem)] right-0 left-0 z-50">
            <SearchSuggestions
              id={listboxId}
              items={results}
              activeIndex={activeIndex}
              onSelect={selectResult}
              onHover={setActiveIndex}
            />
          </div>
        ) : null}
      </div>

      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center border-2 border-line text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
        aria-label="Abrir busca"
        onClick={() => {
          openMobileSearch()
          window.requestAnimationFrame(() => {
            mobileInputRef.current?.focus()
          })
        }}
      >
        <MagnifyingGlass size={22} />
      </button>

      {isMobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-bg/80"
            aria-label="Fechar busca"
            onClick={closeSearch}
          />
          <div className="absolute inset-x-0 top-0 border-b-2 border-line bg-surface px-4 pt-20 pb-4 sm:px-6 sm:pt-24">
            <div className="mx-auto flex max-w-lg items-center gap-2">
              <SearchField
                inputRef={mobileInputRef}
                listboxId={`${listboxId}-mobile`}
                query={query}
                activeDescendantId={
                  activeIndex >= 0
                    ? `${listboxId}-mobile-option-${activeIndex}`
                    : undefined
                }
                isExpanded={showSuggestions}
                showShortcut={false}
                className="flex-1"
                onChange={setQuery}
                onFocus={() => setIsOpen(true)}
                onKeyDown={handleKeyDown}
              />
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center border-2 border-line text-ink transition-colors hover:border-accent hover:text-accent"
                aria-label="Fechar busca"
                onClick={closeSearch}
              >
                <X size={22} />
              </button>
            </div>

            {showSuggestions ? (
              <div className="mx-auto mt-3 max-w-lg">
                <SearchSuggestions
                  id={`${listboxId}-mobile`}
                  items={results}
                  activeIndex={activeIndex}
                  onSelect={selectResult}
                  onHover={setActiveIndex}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
