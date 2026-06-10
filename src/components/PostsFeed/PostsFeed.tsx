import { Reveal } from '@/components/Motion'
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
        <Reveal className="mb-10 sm:mb-12" y={18}>
          <Profile items={siteConfig} />
        </Reveal>
      ) : null}

      <Reveal delay={showProfile ? 0.06 : 0} y={14}>
        <PostsList posts={posts} layout={isHomeLayout ? 'home' : 'grid'} />
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
    </>
  )
}
