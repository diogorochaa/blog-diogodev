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
      <div className="flex w-full justify-items-start pb-4">
        <BackButton />
      </div>

      <div className="relative h-96 w-full sm:h-120">
        <AnimatedCover className="h-full w-full animate-soft-in" />
      </div>

      <div className="w-full max-w-5xl">
        <div className="mt-10">
          <p className="mb-2 text-gray-200">
            {formattedDate} • {readingTime} minutos de leitura
          </p>
          <h1 className="mb-4 text-5xl font-bold sm:text-4xl">{title}</h1>
          <p className="mb-8 text-2xl text-gray-200">{description}</p>
        </div>

        <Mdx field={body} />
      </div>
    </div>
  )
}
