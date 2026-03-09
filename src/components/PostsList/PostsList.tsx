import { Grid } from '@/components/Grid'
import { Reveal } from '@/components/Motion'
import { PostCard } from '@/components/PostCard'

import { BlogPost } from '@/models'

type PostsListProps = {
  posts: BlogPost[]
}

export const PostsList = ({ posts }: PostsListProps) => {
  const firstPost = posts[0]
  const restPosts = posts.slice(1)

  return (
    <div className="w-full animate-soft-in">
      {firstPost && (
        <Reveal delay={0.04} y={16}>
          <PostCard post={firstPost} isMain />
        </Reveal>
      )}

      <Grid sm={1} md={2} lg={3} gap={10}>
        {restPosts.map((post, index) => (
          <Reveal key={post.slug} delay={0.08 + index * 0.04} y={14}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </Grid>
    </div>
  )
}
