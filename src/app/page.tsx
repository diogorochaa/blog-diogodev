import type { Metadata } from 'next'

import { HomePageContent } from './HomePageContent'
import {
  buildBlogJsonLd,
  buildHomeMetadata,
  buildWebsiteJsonLd,
  getHomePageData,
} from './home.data'

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  return await buildHomeMetadata()
}

export default async function Home() {
  const data = await getHomePageData()

  return (
    <HomePageContent
      {...data}
      websiteJsonLd={buildWebsiteJsonLd(data.homeContent)}
      blogJsonLd={buildBlogJsonLd(data.latestPosts, data.homeContent)}
    />
  )
}
