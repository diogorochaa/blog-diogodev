import { Grid } from '@/components/Grid'
import { PostCard } from '@/components/PostCard'
import { PostsCarousel } from '@/components/PostsCarousel'
import { SectionHeading } from '@/components/SectionHeading'

import type { PostsListProps } from './PostsList.types'

const CAROUSEL_SIZE = 4

export const PostsList = ({
  posts,
  layout,
  showMain = false,
}: PostsListProps) => {
  const resolvedLayout = layout ?? (showMain ? 'home' : 'grid')

  if (resolvedLayout === 'home') {
    const carouselPosts = posts.slice(0, CAROUSEL_SIZE)
    const gridPosts = posts.slice(CAROUSEL_SIZE)

    return (
      <div className="flex w-full flex-col gap-10 sm:gap-12">
        {carouselPosts.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Em destaque"
              title="Últimas publicações"
              description="Os quatro artigos mais recentes em destaque."
            />
            <PostsCarousel posts={carouselPosts} />
          </section>
        ) : null}

        {gridPosts.length > 0 ? (
          <section>
            <SectionHeading
              eyebrow="Arquivo"
              title="Mais artigos"
              description="Explore o restante das publicações."
            />
            <Grid
              className="auto-rows-fr items-stretch"
              sm={1}
              md={2}
              lg={3}
              gap={8}
            >
              {gridPosts.map((post) => (
                <div key={post.slug} className="h-full">
                  <PostCard post={post} variant="grid" />
                </div>
              ))}
            </Grid>
          </section>
        ) : null}
      </div>
    )
  }

  return (
    <div className="w-full">
      <Grid className="auto-rows-fr items-stretch" sm={1} md={2} lg={3} gap={8}>
        {posts.map((post) => (
          <div key={post.slug} className="h-full">
            <PostCard post={post} variant="grid" />
          </div>
        ))}
      </Grid>
    </div>
  )
}
