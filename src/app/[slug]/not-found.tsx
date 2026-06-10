import { getRecommendedPosts } from './not-found.data'
import { SlugNotFoundContent } from './SlugNotFoundContent'

export default async function NotFound() {
  const posts = await getRecommendedPosts()

  return <SlugNotFoundContent posts={posts} />
}
