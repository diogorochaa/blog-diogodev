import type { Route } from 'next'
import NextLink from 'next/link'

import { siteConfig } from '@/config'

import type { BreadcrumbItem, BreadcrumbsProps } from './Breadcrumbs.types'

export const buildBreadcrumbJsonLd = (
  items: BreadcrumbItem[],
  currentPath: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${siteConfig.url}${item.href ?? currentPath}`,
  })),
})

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Trilha de navegação" className="w-fit max-w-full">
      <ol className="hud-glass flex flex-wrap items-center gap-2 px-3 py-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <NextLink
                  href={item.href as Route}
                  className="pixel-label text-[9px] text-muted underline decoration-muted/50 decoration-2 underline-offset-4 transition-colors hover:text-accent"
                >
                  {item.label}
                </NextLink>
              ) : (
                <span
                  aria-current="page"
                  className="pixel-label max-w-[60vw] truncate text-[9px] text-ink"
                >
                  {item.label}
                </span>
              )}
              {isLast ? null : (
                <span aria-hidden className="text-[10px] text-accent">
                  ▸
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
