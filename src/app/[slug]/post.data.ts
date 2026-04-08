import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { BlogPost } from '@/models'
import { PostService } from '@/services'

import {
  buildPostMetadataImagePath,
  buildPostMetadataImageUrl,
} from './post.constants'
import { PostJsonLd } from './post.types'

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

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: {
      canonical: `/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/${post.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
      siteName: siteConfig.name,
      images: [
        {
          url: postMetadataImagePath,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [postMetadataImagePath],
    },
  }
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
