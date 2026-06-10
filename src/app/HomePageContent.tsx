import { JsonLd } from '@/components/JsonLd'
import { PostsFeed } from '@/components/PostsFeed'

import type { HomePageContentProps } from './home.types'

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
      <JsonLd data={[websiteJsonLd, blogJsonLd]} />

      <PostsFeed
        posts={posts}
        currentPage={currentPage}
        numbPages={numbPages}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        prevPage={prevPage}
        nextPage={nextPage}
        showProfile
      />
    </main>
  )
}
