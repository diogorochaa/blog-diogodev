import type { Route } from 'next'
import NextLink from 'next/link'

import { ArticleCard } from '@/components/ArticleCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameSection } from '@/components/GameSection'
import { Pagination } from '@/components/Pagination'
import { RetroEmptyState } from '@/components/RetroEmptyState'

import type { BlogArchiveProps } from './BlogArchive.types'

const chipClassName =
  'inline-flex min-h-9 items-center gap-2 border-2 px-3 text-sm transition-colors'

const TagLink = ({
  href,
  label,
  count,
  isActive,
}: {
  href: string
  label: string
  count?: number
  isActive: boolean
}) => (
  <NextLink
    href={href as Route}
    aria-current={isActive ? 'page' : undefined}
    className={`${chipClassName} ${
      isActive
        ? 'border-accent bg-accent font-semibold text-bg'
        : 'border-line-strong bg-bg text-ink hover:border-accent hover:text-accent'
    }`}
  >
    {label}
    {count === undefined ? null : (
      <span
        className={`font-pixel text-[8px] ${isActive ? 'text-bg' : 'text-muted'}`}
      >
        {count}
      </span>
    )}
  </NextLink>
)

export const BlogArchive = ({
  title,
  label,
  description,
  breadcrumbs,
  posts,
  tags,
  activeTagSlug,
  pagination,
}: BlogArchiveProps) => {
  return (
    <main className="screen-enter flex flex-col gap-6">
      <Breadcrumbs items={breadcrumbs} />
      <GameSection
        id="blog-archive"
        label={label}
        title={title}
        description={description}
        headingLevel="h1"
      >
        <div className="flex flex-col gap-8">
          {tags.length > 0 ? (
            <nav
              aria-label="Categorias do blog"
              className="hud-glass flex flex-col gap-3 p-4"
            >
              <p className="pixel-label text-[9px] text-muted">
                Selecionar categoria
              </p>
              <ul className="flex flex-wrap gap-2">
                <li>
                  <TagLink
                    href="/blog"
                    label="Todos"
                    isActive={!activeTagSlug}
                  />
                </li>
                {tags.map((tag) => (
                  <li key={tag.slug}>
                    <TagLink
                      href={`/blog/tag/${tag.slug}`}
                      label={tag.name}
                      count={tag.count}
                      isActive={tag.slug === activeTagSlug}
                    />
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted">
                Procurando algo específico? Use a busca no topo da página
                (atalho <kbd className="font-pixel text-[9px]">Ctrl K</kbd>).
              </p>
            </nav>
          ) : null}

          {posts.length > 0 ? (
            <ol className="flex flex-col gap-3" aria-label="Artigos">
              {posts.map(({ post, stage }) => (
                <li key={post.slug}>
                  <ArticleCard post={post} stage={stage} headingLevel="h2" />
                </li>
              ))}
            </ol>
          ) : (
            <RetroEmptyState
              sprite="book"
              title="Nenhum artigo por aqui"
              description="Ainda não há artigos publicados nesta seleção."
            />
          )}

          {pagination && pagination.numbPages > 1 ? (
            <Pagination {...pagination} />
          ) : null}
        </div>
      </GameSection>
    </main>
  )
}
