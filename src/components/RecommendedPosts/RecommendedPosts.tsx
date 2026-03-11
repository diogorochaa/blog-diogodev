import { Grid } from '@/components/Grid'
import { PostCard } from '@/components/PostCard'

import type { RecommendedPostsProps } from './RecommendedPosts.types'

export const RecommendedPosts = ({ posts }: RecommendedPostsProps) => {
  const postsRecommended = posts.slice(0, 2)

  return (
    <div className="mb-14 mt-8 flex flex-col animate-soft-in">
      <Grid sm={1} md={2} lg={2} gap={2}>
        {postsRecommended.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </Grid>
    </div>
  )
}
