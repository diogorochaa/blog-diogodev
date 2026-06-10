import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'
import { Profile } from '@/components/Profile'

import { siteConfig } from '@/config'

import type { PostsFeedProps } from './PostsFeed.types'

export const PostsFeed = ({
  posts,
  currentPage,
  numbPages,
  totalPosts,
  postsPerPage,
  prevPage,
  nextPage,
  showProfile = false,
  showMainPost = true,
}: PostsFeedProps) => {
  const isHomeLayout = showProfile && showMainPost && currentPage === 1

  return (
    <>
      {showProfile ? (
        <div className="mb-10 sm:mb-12">
          <Profile items={siteConfig} />
        </div>
      ) : null}

      <PostsList posts={posts} layout={isHomeLayout ? 'home' : 'grid'} />

      <Pagination
        currentPage={currentPage}
        numbPages={numbPages}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  )
}
