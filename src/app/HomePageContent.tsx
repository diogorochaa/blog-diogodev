import { Reveal } from '@/components/Motion'
import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'
import { Profile } from '@/components/Profile'

import { siteConfig } from '@/config'

import { HomePageContentProps } from './home.types'

export const HomePageContent = ({
  websiteJsonLd,
  blogJsonLd,
  posts,
  currentPage,
  numbPages,
  totalPosts,
  postsPerPage,
  prevPage,
  nextPage,
}: HomePageContentProps) => {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <Reveal className="my-10" y={22}>
        <Profile items={siteConfig} />
      </Reveal>

      <Reveal delay={0.08}>
        <PostsList posts={posts} />
      </Reveal>

      <Reveal delay={0.14}>
        <Pagination
          currentPage={currentPage}
          numbPages={numbPages}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Reveal>
    </main>
  )
}
