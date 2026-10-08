import { withStages } from '@/lib/blog'
import { PostService } from '@/services'

const RECOMMENDED_POSTS_LIMIT = 3

export const getRecommendedPosts = async () => {
  const { posts } = await PostService.getAll({
    limit: RECOMMENDED_POSTS_LIMIT,
  })

  return await withStages(posts)
}
