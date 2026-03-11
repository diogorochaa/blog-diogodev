import { Reveal } from '@/components/Motion'
import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'

import { PagedPostsContentProps } from './page.types'

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
      <Reveal y={16}>
        <PostsList posts={posts} showMain={false} />
      </Reveal>

      <Reveal delay={0.1}>
        <Pagination
          currentPage={currentPage}
          numbPages={numbPages}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Reveal>
    </div>
  )
}
