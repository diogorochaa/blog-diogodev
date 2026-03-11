import { SlugNotFoundContent } from './SlugNotFoundContent'
import { getRecommendedPosts } from './not-found.data'

export default async function NotFound() {
  const posts = await getRecommendedPosts()

  return <SlugNotFoundContent posts={posts} />
}
