import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { paginationPages } from '@/functions'
import { PostService } from '@/services'

import { Reveal } from '@/components/Motion'
import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'
import { Profile } from '@/components/Profile'

const OG_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export const metadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
}

export default async function Home() {
  const { posts, currentPage, numbPages, totalPosts, postsPerPage } =
    await PostService.getAll()
  const { prevPage, nextPage } = paginationPages(currentPage)

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    description: siteConfig.description,
  }

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'pt-BR',
    blogPost: posts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      url: `${siteConfig.url}/${post.slug}`,
      timeRequired: `PT${post.readingTime}M`,
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

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
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Reveal>
    </main>
  )
}
