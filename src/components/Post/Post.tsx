import type { Route } from 'next'
import NextLink from 'next/link'

import { formatStage } from '@/components/ArticleCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { RetroBadge } from '@/components/RetroBadge'
import { RichText } from '@/components/RichText'
import { formatDate, toIsoDate, toTagSlug } from '@/utils'

import type { PostProps } from './Post.types'

export const Post = ({
  post,
  titleId,
  headingIdsInOrder,
  stage,
  totalStages,
}: PostProps) => {
  const { body, frontmatter, readingTime } = post
  const { title, description, date, tags } = frontmatter

  return (
    <article id="post-content" className="flex w-full min-w-0 flex-col gap-8">
      <Breadcrumbs
        items={[
          { label: 'Início', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: title },
        ]}
      />

      <header className="pixel-frame scanlines overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line px-5 py-3">
          {stage ? (
            <p className="flex items-baseline gap-2">
              <span className="pixel-label text-[9px] text-muted">Fase</span>
              <span className="font-pixel text-base text-accent">
                {formatStage(stage)}
              </span>
              {totalStages ? (
                <span className="pixel-label text-[9px] text-muted">
                  / {formatStage(totalStages)}
                </span>
              ) : null}
            </p>
          ) : (
            <RetroBadge variant="accent">Artigo</RetroBadge>
          )}
          {tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label="Categorias">
              {tags.map((tag) => (
                <li key={tag}>
                  <NextLink
                    href={`/blog/tag/${toTagSlug(tag)}` as Route}
                    className="inline-flex min-h-8 items-center border-2 border-line-strong px-2 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {tag}
                  </NextLink>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex flex-col gap-4 px-5 py-7 sm:px-8 sm:py-10">
          <h1
            id={titleId}
            className="scroll-mt-28 font-display text-3xl leading-tight font-extrabold text-ink sm:text-4xl md:text-5xl"
          >
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {description}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={toIsoDate(date)}>{formatDate(date)}</time>
            <span aria-hidden className="text-accent">
              ■
            </span>
            <span>{readingTime} min de leitura</span>
          </p>
        </div>

        <div
          aria-hidden
          className="pitch-surface flex items-center justify-between border-t-2 border-line-strong px-5 py-2"
        >
          <span className="pixel-label on-pitch text-[9px] text-ink">
            Início de jogo
          </span>
          <span className="pixel-label on-pitch text-[9px] text-score">
            Diogo FC
          </span>
        </div>
      </header>

      <div className="pixel-frame w-full min-w-0 px-5 py-6 sm:px-8 sm:py-8">
        <div className="max-w-[72ch]">
          <RichText field={body} headingIdsInOrder={headingIdsInOrder} />
        </div>
      </div>
    </article>
  )
}
