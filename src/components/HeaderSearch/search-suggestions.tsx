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
        className={`card-vivid p-4 text-sm text-gray-400 ${className}`}
      >
        Nenhum artigo encontrado.
      </div>
    )
  }

  return (
    <div
      id={id}
      role="listbox"
      className={`card-vivid overflow-hidden p-2 ${className}`}
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
              className={`block w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? 'bg-accent-cyan/10 text-accent-cyan'
                  : 'text-gray-200 hover:bg-white/5 hover:text-white'
              }`}
              onMouseEnter={() => onHover(index)}
              onClick={() => onSelect(item.slug)}
            >
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="mt-0.5 block truncate text-xs text-gray-400">
                {item.description}
              </span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
