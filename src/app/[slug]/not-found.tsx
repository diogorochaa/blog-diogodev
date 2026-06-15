import { slugNotFoundMetadata } from '@/lib/seo/notFoundMetadata'

import { getRecommendedPosts } from './not-found.data'
import { SlugNotFoundContent } from './SlugNotFoundContent'

export const metadata = slugNotFoundMetadata

export default async function NotFound() {
  const posts = await getRecommendedPosts()

  return <SlugNotFoundContent posts={posts} />
}
