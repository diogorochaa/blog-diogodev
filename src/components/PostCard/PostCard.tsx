import type { Route } from 'next'
import NextLink from 'next/link'

import { PixelSprite } from '@/components/PixelSprite'
import { RetroBadge } from '@/components/RetroBadge'
import { formatDate, toIsoDate } from '@/utils'

import type { PostCardProps } from './PostCard.types'

export type { PostCardProps } from './PostCard.types'

export const PostCard = ({
  post,
  variant = 'grid',
  isMain = false,
}: PostCardProps) => {
  const resolvedVariant = isMain ? 'carousel' : variant
  const { frontmatter, readingTime, slug } = post
  const { title, description, date, tags } = frontmatter
  const isCarousel = resolvedVariant === 'carousel'

  return (
    <NextLink
      className={[
        'pixel-frame-interactive group flex h-full w-full flex-col border-2 border-line bg-surface text-left',
        isCarousel ? 'min-h-[20rem]' : 'min-h-[18rem]',
      ].join(' ')}
      href={`/blog/${slug}` as Route}
    >
      <div
        aria-hidden
        className="pitch-surface flex h-20 items-center justify-between border-b-2 border-line px-4"
      >
        <PixelSprite name="ball" scale={3} />
        <span className="pixel-label text-[8px] text-ink/80">Artigo</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {tags?.[0] ? (
          <RetroBadge className="self-start">{tags[0]}</RetroBadge>
        ) : null}

        <h3
          className={[
            'line-clamp-2 font-display leading-tight font-bold text-ink transition-colors group-hover:text-accent',
            isCarousel ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
          ].join(' ')}
        >
          {title}
        </h3>

        <p
          className={[
            'line-clamp-3 text-sm leading-relaxed text-muted',
            isCarousel ? 'sm:line-clamp-4' : '',
          ].join(' ')}
        >
          {description}
        </p>

        <time className="mt-auto text-xs text-muted" dateTime={toIsoDate(date)}>
          {formatDate(date)} · {readingTime} min de leitura
        </time>
      </div>
    </NextLink>
  )
}
