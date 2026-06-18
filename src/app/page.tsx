import type { Metadata } from 'next'

import { PostService } from '@/services'
import { paginationPages } from '@/utils'

import { HomePageContent } from './HomePageContent'
import {
  buildBlogJsonLd,
  buildHomeMetadata,
  buildWebsiteJsonLd,
  getHomeContent,
} from './home.data'

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  return await buildHomeMetadata()
}

export default async function Home() {
  const [homeContent, postsResult] = await Promise.all([
    getHomeContent(),
    PostService.getAll(),
  ])
  const { posts, currentPage, numbPages, totalPosts, postsPerPage } =
    postsResult
  const { prevPage, nextPage } = paginationPages(currentPage)

  const websiteJsonLd = buildWebsiteJsonLd(homeContent)
  const blogJsonLd = buildBlogJsonLd(posts, homeContent)

  return (
    <HomePageContent
      homeContent={homeContent}
      websiteJsonLd={websiteJsonLd}
      blogJsonLd={blogJsonLd}
      posts={posts}
      currentPage={currentPage}
      numbPages={numbPages}
      totalPosts={totalPosts}
      postsPerPage={postsPerPage}
      prevPage={prevPage}
      nextPage={nextPage}
    />
  )
}
