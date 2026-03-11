import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { BlogPost } from '@/models'
import { PostService } from '@/services'

import { POST_METADATA_IMAGE } from './post.constants'
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
          url: POST_METADATA_IMAGE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [POST_METADATA_IMAGE],
    },
  }
}

export const buildPostJsonLd = (post: BlogPost): PostJsonLd => {
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
        url: POST_METADATA_IMAGE,
      },
    },
    image: [POST_METADATA_IMAGE],
  }
}
