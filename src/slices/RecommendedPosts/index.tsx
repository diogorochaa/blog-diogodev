import { Grid } from '@/components/Grid'
import { PostCard } from '@/components/PostCard'
import { SectionHeading } from '@/components/SectionHeading'
import type { BlogPost } from '@/models'

import type { PrismicSlice } from '../slice.types'
import { getTextField } from '../slice.types'

type RecommendedPostsSliceProps = {
  slice: PrismicSlice
  posts: BlogPost[]
}

export const RecommendedPosts = ({
  slice,
  posts,
}: RecommendedPostsSliceProps) => {
  const primary = slice.primary
  const heading = getTextField(primary, 'heading', 'Artigos recomendados')

  if (posts.length === 0) {
    return null
  }

  return (
    <section>
      {heading ? <SectionHeading title={heading} /> : null}
      <Grid sm={1} md={2} lg={2} gap={4}>
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </Grid>
    </section>
  )
}

export default RecommendedPosts
