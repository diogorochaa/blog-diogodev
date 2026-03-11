import { Empty } from '@/components/Empty'
import { RecommendedPosts } from '@/components/RecommendedPosts'

import { SlugNotFoundContentProps } from './not-found.types'

export const SlugNotFoundContent = ({ posts }: SlugNotFoundContentProps) => {
  return (
    <Empty>
      <h1 className="text-center text-4xl font-extrabold animate-slide-up">
        Oops. Essa página não foi encontrada.
      </h1>

      <p className="mt-4 text-center text-xl text-gray-400 animate-slide-up">
        Posts recomendados para você:
      </p>

      <RecommendedPosts posts={posts} />
    </Empty>
  )
}
