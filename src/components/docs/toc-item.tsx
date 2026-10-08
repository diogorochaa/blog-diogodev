'use client'

import { List } from '@phosphor-icons/react'
import { forwardRef } from 'react'

import type { TocItem as TocItemType } from '@/utils/toc'

type TocItemLinkProps = {
  item: TocItemType
  isActive: boolean
  onNavigate: (id: string) => void
}

const INDENT_BY_LEVEL: Record<number, string> = {
  1: 'pl-0',
  2: 'pl-3',
  3: 'pl-6',
  4: 'pl-9',
}

const TocItem = ({ item, isActive, onNavigate }: TocItemLinkProps) => {
  const indent = INDENT_BY_LEVEL[item.level] ?? 'pl-9'

  return (
    <li>
      <button
        type="button"
        aria-current={isActive ? 'location' : undefined}
        className={`block w-full border-l-2 py-1.5 pr-2 text-left text-sm leading-snug transition-colors ${indent} ${
          isActive
            ? 'border-accent font-semibold text-ink'
            : 'border-transparent text-muted hover:text-accent'
        }`}
        onClick={() => onNavigate(item.id)}
      >
        <span aria-hidden className={isActive ? 'mr-1 text-accent' : 'hidden'}>
          ▸
        </span>
        {item.text}
      </button>
    </li>
  )
}

type TocNavProps = {
  items: TocItemType[]
  activeId: string | null
  onNavigate: (id: string) => void
  className?: string
  id?: string
}

export const TocNav = forwardRef<HTMLElement, TocNavProps>(function TocNav(
  { items, activeId, onNavigate, className = '', id },
  ref,
) {
  return (
    <nav ref={ref} aria-label="Nesta página" className={className} id={id}>
      <div className="pixel-label mb-4 flex items-center gap-2 text-[9px] text-ink">
        <List size={16} aria-hidden className="text-accent" />
        <span>Nesta página</span>
      </div>

      <ul className="space-y-0.5">
        {items.map((item) => (
          <TocItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  )
})
