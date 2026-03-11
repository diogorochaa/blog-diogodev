import type { Route } from 'next'

import { formatDate } from '@/utils'
import NextLink from 'next/link'

import { AnimatedCover } from '@/components/AnimatedCover'
import { Tag } from '@/components/Tag'

import type { PostCardProps } from './PostCard.types'

export type { PostCardProps } from './PostCard.types'

export const PostCard = ({ post, isMain = false }: PostCardProps) => {
  const { frontmatter, readingTime, slug } = post
  const { title, description, date, tags } = frontmatter

  const formattedDate = formatDate(date)
  const postPath = `/${slug}` as Route

  return (
    <NextLink
      className={[
        'group flex w-full flex-col rounded-xl border border-accent-purple/20 bg-linear-to-br from-secondary/80 to-secondary/60 p-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-accent-cyan/55 hover:shadow-glow-cyan animate-soft-in',
        isMain ? 'mb-6 lg:flex-row' : 'h-full',
      ]
        .filter(Boolean)
        .join(' ')}
      href={postPath}
    >
      <div
        className={[
          'relative h-60 w-full sm:h-72 md:h-80',
          isMain ? 'lg:mr-3' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <AnimatedCover className="h-full w-full" compact />
      </div>

      <div
        className={['flex flex-1 flex-col pt-3', isMain ? 'lg:pt-0' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <time className="text-gray-400">
          {formattedDate} • {readingTime} minutos de leitura
        </time>

        <p className="mt-2 max-w-md wrap-break-word text-xl leading-tight font-bold text-white transition-colors duration-300 group-hover:text-accent-cyan sm:text-2xl">
          {title}
        </p>

        <p className="mt-3 line-clamp-3 text-gray-300">{description}</p>
      </div>
    </NextLink>
  )
}
