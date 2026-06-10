import { Grid } from '@/components/Grid'
import { Reveal } from '@/components/Motion'
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
            <Reveal y={14}>
              <SectionHeading
                eyebrow="Em destaque"
                title="Últimas publicações"
                description="Os quatro artigos mais recentes em destaque."
              />
            </Reveal>
            <Reveal delay={0.06} y={12}>
              <PostsCarousel posts={carouselPosts} />
            </Reveal>
          </section>
        ) : null}

        {gridPosts.length > 0 ? (
          <section>
            <Reveal y={12}>
              <SectionHeading
                eyebrow="Arquivo"
                title="Mais artigos"
                description="Explore o restante das publicações."
              />
            </Reveal>
            <Grid
              className="auto-rows-fr items-stretch"
              sm={1}
              md={2}
              lg={3}
              gap={8}
            >
              {gridPosts.map((post, index) => (
                <Reveal
                  key={post.slug}
                  className="h-full"
                  delay={Math.min(0.08 + index * 0.04, 0.2)}
                  y={12}
                >
                  <PostCard post={post} variant="grid" />
                </Reveal>
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
        {posts.map((post, index) => (
          <Reveal
            key={post.slug}
            className="h-full"
            delay={Math.min(0.06 + index * 0.03, 0.18)}
            y={12}
          >
            <PostCard post={post} variant="grid" />
          </Reveal>
        ))}
      </Grid>
    </div>
  )
}
