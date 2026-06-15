import type { ReactNode } from 'react'

import type { TocItem } from '@/utils/toc'

import { TableOfContents } from './table-of-contents'

type PostWithTocProps = {
  items: TocItem[]
  children: ReactNode
}

export const PostWithToc = ({ items, children }: PostWithTocProps) => {
  const showToc = items.length >= 2

  if (!showToc) {
    return (
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl">{children}</div>
    )
  }

  return (
    <div className="w-full">
      <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-10">
        <TableOfContents items={items} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  )
}
