import { siteConfig } from '@/config'

import { BlogPost } from '@/models'

import { HomeBlogJsonLd, HomeWebsiteJsonLd } from './home.types'

export const buildWebsiteJsonLd = (): HomeWebsiteJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: 'pt-BR',
    description: siteConfig.description,
  }
}

export const buildBlogJsonLd = (posts: BlogPost[]): HomeBlogJsonLd => {
  return {
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
}
