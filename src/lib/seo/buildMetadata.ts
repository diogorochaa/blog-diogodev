import type { Metadata } from 'next'

import { siteConfig } from '@/config'

import {
  OG_IMAGE_SIZE,
  SITE_AUTHOR,
  SITE_LOCALE,
  TWITTER_CREATOR,
  TWITTER_SITE,
} from './metadata.constants'

const DEFAULT_OG_IMAGE = '/opengraph-image'

export type BuildPageMetadataParams = {
  title?: string
  description: string
  path: string
  image?: string
  imageAlt?: string
  openGraphType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  section?: string
}

const buildOgImage = (url: string, alt: string) => ({
  url,
  width: OG_IMAGE_SIZE.width,
  height: OG_IMAGE_SIZE.height,
  alt,
})

export const buildPageMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt,
  openGraphType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  section,
}: BuildPageMetadataParams): Metadata => {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const pageUrl = `${siteConfig.url}${canonicalPath}`
  const openGraphTitle = title ?? siteConfig.name
  const twitterTitle = title ?? siteConfig.name
  const resolvedImageAlt = imageAlt ?? openGraphTitle
  const ogImage = buildOgImage(image, resolvedImageAlt)

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: openGraphType,
      locale: SITE_LOCALE,
      url: pageUrl,
      title: openGraphTitle,
      description,
      siteName: siteConfig.name,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors?.length ? { authors } : {}),
      ...(tags?.length ? { tags } : {}),
      ...(section ? { section } : {}),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      creator: TWITTER_CREATOR,
      title: twitterTitle,
      description,
      images: {
        url: image,
        alt: resolvedImageAlt,
      },
    },
  }
}

export const buildSiteLogoUrl = () => `${siteConfig.url}/icon`

export const buildAuthorMetadata = () => [SITE_AUTHOR]
