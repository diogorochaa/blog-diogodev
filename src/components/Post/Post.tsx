import { formatDate } from '@/functions'

import { AnimatedCover } from '@/components/AnimatedCover'
import { Mdx } from '@/components/Mdx'

import { BlogPost } from '@/models'

import { BackButton } from './components'

type PostProps = {
  post: BlogPost
}

export const Post = ({ post }: PostProps) => {
  const { body, frontmatter, readingTime } = post
  const { title, description, date } = frontmatter
  const formattedDate = formatDate(date)

  return (
    <div className="flex flex-col items-center justify-center animate-soft-in">
      <div className="flex w-full justify-items-start pb-3 sm:pb-4">
        <BackButton />
      </div>

      <div className="relative h-52 w-full sm:h-72 md:h-96">
        <AnimatedCover className="h-full w-full animate-soft-in" />
      </div>

      <div className="w-full max-w-4xl">
        <div className="mt-7 sm:mt-10">
          <p className="mb-2 text-sm text-gray-200 sm:text-base">
            {formattedDate} • {readingTime} minutos de leitura
          </p>
          <h1 className="mb-4 text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mb-7 text-lg text-gray-200 sm:mb-8 sm:text-xl md:text-2xl">
            {description}
          </p>
        </div>

        <Mdx field={body} />
      </div>
    </div>
  )
}
