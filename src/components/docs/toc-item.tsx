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

export const TocItem = ({ item, isActive, onNavigate }: TocItemLinkProps) => {
  const indent = INDENT_BY_LEVEL[item.level] ?? 'pl-9'

  return (
    <li>
      <button
        type="button"
        className={`block w-full rounded-md py-1.5 text-left text-sm leading-snug transition-colors ${indent} ${
          isActive
            ? 'font-semibold text-white'
            : 'text-gray-400 hover:text-accent-cyan'
        }`}
        onClick={() => onNavigate(item.id)}
      >
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
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-gray-300">
        <List size={18} aria-hidden />
        <span>Nesta página</span>
      </div>

      <ul className="space-y-1">
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
