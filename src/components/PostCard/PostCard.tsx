import type { Route } from 'next'
import NextLink from 'next/link'
import { AnimatedCover } from '@/components/AnimatedCover'
import { Tag } from '@/components/Tag'
import { formatDate, getCoverVariant, toIsoDate } from '@/utils'

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

  const formattedDate = formatDate(date)
  const isoDate = toIsoDate(date)
  const postPath = `/${slug}` as Route
  const coverVariant = getCoverVariant(slug)
  const isCarousel = resolvedVariant === 'carousel'

  return (
    <NextLink
      className={[
        'card-vivid group flex h-full w-full flex-col text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-vivid',
        isCarousel ? 'min-h-[22rem]' : 'min-h-[20rem]',
      ].join(' ')}
      href={postPath}
    >
      <div
        className={[
          'relative w-full overflow-hidden',
          isCarousel ? 'h-44 sm:h-48' : 'h-40 sm:h-44',
        ].join(' ')}
      >
        <AnimatedCover
          className="h-full w-full rounded-b-none rounded-t-[0.9rem]"
          compact
          variant={coverVariant}
        />
        {tags?.[0] ? (
          <div className="absolute left-3 top-3 z-20">
            <Tag size="xs">{tags[0]}</Tag>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <time
          className="text-xs font-medium uppercase tracking-wide text-gray-400"
          dateTime={isoDate}
        >
          {formattedDate} · {readingTime} min
        </time>

        <h3
          className={[
            'line-clamp-2 font-display font-bold leading-tight text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-accent-cyan group-hover:via-accent-purple group-hover:to-accent-pink',
            isCarousel ? 'text-lg sm:text-xl' : 'text-base sm:text-lg',
          ].join(' ')}
        >
          {title}
        </h3>

        <p
          className={[
            'line-clamp-3 text-sm leading-relaxed text-gray-400',
            isCarousel ? 'sm:line-clamp-4' : '',
          ].join(' ')}
        >
          {description}
        </p>
      </div>
    </NextLink>
  )
}
