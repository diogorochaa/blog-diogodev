import { BlogPost } from '@/models'

import { Grid } from '@/components/Grid'
import { PostCard } from '@/components/PostCard'

import * as S from './styles'

type RecommendedPostsProps = {
  posts: BlogPost[]
}

export const RecommendedPosts = ({ posts }: RecommendedPostsProps) => {
  const postsRecommended = posts.slice(0, 2)

  return (
    <S.Container>
      <Grid sm={1} md={2} lg={2} gap={2}>
        {postsRecommended.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </Grid>
    </S.Container>
  )
}
