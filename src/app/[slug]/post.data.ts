import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { BlogPost } from '@/models'
import { PostService } from '@/services'

import {
  buildPostMetadataImagePath,
  buildPostMetadataImageUrl,
} from './post.constants'
import type { PostJsonLd } from './post.types'

export const getPostStaticParams = async () => {
  const slugs = await PostService.getAllSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export const getPostBySlug = async (slug: string) => {
  return await PostService.getBySlug(slug)
}

export const buildPostMetadata = (post: BlogPost): Metadata => {
  const postMetadataImagePath = buildPostMetadataImagePath(post.slug)

  return buildPageMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/${post.slug}`,
    image: postMetadataImagePath,
    openGraphType: 'article',
    publishedTime: post.frontmatter.date,
  })
}

export const buildPostJsonLd = (post: BlogPost): PostJsonLd => {
  const postMetadataImageUrl = buildPostMetadataImageUrl(post.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: `${siteConfig.url}/${post.slug}`,
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    url: `${siteConfig.url}/${post.slug}`,
    timeRequired: `PT${post.readingTime}M`,
    author: {
      '@type': 'Person',
      name: 'Diogo Rocha',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/opengraph-image`,
      },
    },
    image: [postMetadataImageUrl],
  }
}
