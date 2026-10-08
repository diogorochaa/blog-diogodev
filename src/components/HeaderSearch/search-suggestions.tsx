import type { PostSearchItem } from '@/models/post-search'

type SearchSuggestionsProps = {
  id: string
  items: PostSearchItem[]
  activeIndex: number
  onSelect: (slug: string) => void
  onHover: (index: number) => void
  className?: string
}

export const SearchSuggestions = ({
  id,
  items,
  activeIndex,
  onSelect,
  onHover,
  className = '',
}: SearchSuggestionsProps) => {
  if (items.length === 0) {
    return (
      <div
        id={id}
        className={`border-2 border-line bg-surface p-4 text-sm text-muted shadow-pixel ${className}`}
      >
        Nenhum artigo encontrado.
      </div>
    )
  }

  return (
    <div
      id={id}
      role="listbox"
      className={`overflow-hidden border-2 border-line bg-surface p-2 shadow-pixel ${className}`}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex

        return (
          <div key={item.slug}>
            <button
              type="button"
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={isActive}
              className={`block w-full border-l-2 px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? 'border-accent bg-surface-2 text-accent'
                  : 'border-transparent text-ink hover:bg-surface-2 hover:text-accent'
              }`}
              onMouseEnter={() => onHover(index)}
              onClick={() => onSelect(item.slug)}
            >
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="mt-0.5 block truncate text-xs text-muted">
                {item.description}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
