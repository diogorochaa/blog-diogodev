import { Grid } from '@/components/Grid'
import { Reveal } from '@/components/Motion'
import { PostCard } from '@/components/PostCard'

import { BlogPost } from '@/models'

type PostsListProps = {
  posts: BlogPost[]
  showMain?: boolean
}

export const PostsList = ({ posts, showMain = true }: PostsListProps) => {
  const firstPost = showMain ? posts[0] : undefined
  const restPosts = showMain ? posts.slice(1) : posts

  return (
    <div className="w-full animate-soft-in">
      {firstPost && (
        <Reveal delay={0.04} y={16}>
          <PostCard post={firstPost} isMain />
        </Reveal>
      )}

      <Grid
        className="auto-rows-fr items-stretch"
        sm={1}
        md={2}
        lg={3}
        gap={10}
      >
        {restPosts.map((post, index) => (
          <Reveal
            key={post.slug}
            className="h-full"
            delay={0.08 + index * 0.04}
            y={14}
          >
            <PostCard post={post} />
          </Reveal>
        ))}
      </Grid>
    </div>
  )
}
