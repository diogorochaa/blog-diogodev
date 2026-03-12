import type { ReactNode } from 'react'

import type { BlogPost } from '@/models'

import { mockPosts } from './mocks/blog'

export const storySurfaceOptions = ['primary', 'secondary', 'elevated'] as const

export type StorySurfaceTone = (typeof storySurfaceOptions)[number]

const storySurfaceClassNames: Record<StorySurfaceTone, string> = {
  primary: 'bg-primary text-gray-100',
  secondary: 'bg-secondary text-gray-100',
  elevated:
    'bg-linear-to-br from-secondary via-secondary/80 to-slate-900 text-gray-100',
}

type StorySurfaceProps = {
  children: ReactNode
  surfaceTone?: StorySurfaceTone
  className?: string
}

type CreateMockPostOverrides = {
  index?: number
  title?: string
  description?: string
  date?: string
  tags?: string[]
  readingTime?: number
  slug?: string
}

export const getStorySurfaceClassName = (
  surfaceTone: StorySurfaceTone = 'primary',
) => {
  return storySurfaceClassNames[surfaceTone]
}

export const StorySurface = ({
  children,
  surfaceTone = 'primary',
  className,
}: StorySurfaceProps) => {
  return (
    <div
      className={[
        'w-full',
        getStorySurfaceClassName(surfaceTone),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}

export const splitCommaSeparatedValues = (value: string) => {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const createMockPost = ({
  index = 0,
  title,
  description,
  date,
  tags,
  readingTime,
  slug,
}: CreateMockPostOverrides = {}): BlogPost => {
  const basePost = mockPosts[index] ?? mockPosts[0]

  return {
    ...basePost,
    slug: slug ?? basePost.slug,
    readingTime: readingTime ?? basePost.readingTime,
    frontmatter: {
      ...basePost.frontmatter,
      title: title ?? basePost.frontmatter.title,
      description: description ?? basePost.frontmatter.description,
      date: date ?? basePost.frontmatter.date,
      tags: tags ?? basePost.frontmatter.tags,
    },
  }
}
