import { PostsFeed } from '@/components/PostsFeed'

import type { PagedPostsContentProps } from './page.types'

export const PagedPostsContent = ({
  posts,
  currentPage,
  numbPages,
  totalPosts,
  postsPerPage,
  prevPage,
  nextPage,
}: PagedPostsContentProps) => {
  return (
    <div>
      <PostsFeed
        posts={posts}
        currentPage={currentPage}
        numbPages={numbPages}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        prevPage={prevPage}
        nextPage={nextPage}
        showMainPost={false}
      />
    </div>
  )
}
