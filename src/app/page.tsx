import { siteConfig } from '@/config'
import { paginationPages } from '@/functions'
import { PostService } from '@/services'

import { Reveal } from '@/components/Motion'
import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'
import { Profile } from '@/components/Profile'

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/assets/images/logo.png',
      },
    ],
  },
  robots: 'follow,index',
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/assets/images/logo.png`],
  },
}

export default async function Home() {
  const { posts, currentPage, numbPages } = await PostService.getAll()
  const { prevPage, nextPage } = paginationPages(currentPage)

  return (
    <main>
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
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Reveal>
    </main>
  )
}
