import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'

import type { BlogPost, HomeContent } from '@/models'
import { ContentService } from '@/services'

import type { HomeBlogJsonLd, HomeWebsiteJsonLd } from './home.types'

export const getHomeContent = () => ContentService.getHomeContent()

export const buildHomeMetadata = async () => {
  const content = await getHomeContent()

  return buildPageMetadata({
    title: content.ogTitle === siteConfig.name ? undefined : content.ogTitle,
    description: content.description,
    path: '/',
    image: '/opengraph-image',
    imageAlt: content.ogTitle,
  })
}

export const buildWebsiteJsonLd = (content: HomeContent): HomeWebsiteJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    description: content.description,
  }
}

export const buildBlogJsonLd = (
  posts: BlogPost[],
  content: HomeContent,
): HomeBlogJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    url: siteConfig.url,
    description: content.description,
    inLanguage: 'pt-BR',
    blogPost: posts.slice(0, content.featuredPostsLimit).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.frontmatter.title,
      description: post.frontmatter.description,
      datePublished: post.frontmatter.date,
      url: `${siteConfig.url}/${post.slug}`,
      timeRequired: `PT${post.readingTime}M`,
    })),
  }
}
