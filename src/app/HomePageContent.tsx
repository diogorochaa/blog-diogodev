import { JsonLd } from '@/components/JsonLd'
import { PostsFeed } from '@/components/PostsFeed'
import { SliceRenderer } from '@/components/SliceRenderer'

import type { HomePageContentProps } from './home.types'

export const HomePageContent = ({
  homeContent,
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
        profileContent={homeContent}
        showProfile
      />

      {homeContent.slices.length > 0 ? (
        <div className="mt-12 sm:mt-16">
          <SliceRenderer slices={homeContent.slices} />
        </div>
      ) : null}
    </main>
  )
}
