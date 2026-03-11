import { PostService } from '@/services'
import { paginationPages } from '@/utils'

import { HomePageContent } from './HomePageContent'
import { homeMetadata } from './home.constants'
import { buildBlogJsonLd, buildWebsiteJsonLd } from './home.data'

export const metadata = homeMetadata

export default async function Home() {
  const { posts, currentPage, numbPages, totalPosts, postsPerPage } =
    await PostService.getAll()
  const { prevPage, nextPage } = paginationPages(currentPage)

  const websiteJsonLd = buildWebsiteJsonLd()
  const blogJsonLd = buildBlogJsonLd(posts)

  return (
    <HomePageContent
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
