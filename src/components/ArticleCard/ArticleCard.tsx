import type { Route } from 'next'
import NextLink from 'next/link'

import { PixelSprite } from '@/components/PixelSprite'
import { RetroBadge } from '@/components/RetroBadge'
import { formatDate, toIsoDate } from '@/utils'

import type { ArticleCardProps } from './ArticleCard.types'

export const formatStage = (stage: number) => String(stage).padStart(2, '0')

export const ArticleCard = ({
  post,
  stage,
  headingLevel = 'h3',
}: ArticleCardProps) => {
  const Heading = headingLevel
  const { title, description, date, tags } = post.frontmatter

  return (
    <article className="group relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-3 border-2 border-line bg-surface p-4 transition-colors hover:border-accent focus-within:border-accent sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-x-6 sm:p-5">
      <p className="flex flex-col items-start gap-1 sm:items-center">
        <span className="pixel-label text-[8px] text-muted">Fase</span>
        <span className="font-pixel text-lg text-accent sm:text-xl">
          {formatStage(stage)}
        </span>
      </p>

      <div className="flex min-w-0 flex-col gap-2">
        <Heading className="font-display text-lg leading-snug font-bold text-ink sm:text-xl">
          <NextLink
            href={`/blog/${post.slug}` as Route}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </NextLink>
        </Heading>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {description}
        </p>
        <p className="text-xs text-muted">
          <time dateTime={toIsoDate(date)}>{formatDate(date)}</time>
          <span aria-hidden> · </span>
          {post.readingTime} min de leitura
        </p>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end">
        {tags[0] ? <RetroBadge>{tags[0]}</RetroBadge> : <span />}
        <span className="pixel-label flex items-center gap-2 text-[9px] text-ink transition-colors group-hover:text-accent">
          <PixelSprite name="cursor" scale={2} />
          Jogar
        </span>
      </div>
    </article>
  )
}
