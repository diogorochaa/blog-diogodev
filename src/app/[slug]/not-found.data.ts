import { PostService } from '@/services'

export const getRecommendedPosts = async () => {
  const { posts } = await PostService.getAll()

  return posts
}
