import type { Metadata } from 'next'

import { siteConfig } from '@/config'

const DEFAULT_OG_IMAGE = '/opengraph-image'

export type BuildPageMetadataParams = {
  title?: string
  description: string
  path: string
  image?: string
  openGraphType?: 'website' | 'article'
  publishedTime?: string
}

export const buildPageMetadata = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  openGraphType = 'website',
  publishedTime,
}: BuildPageMetadataParams): Metadata => {
  const canonicalPath = path.startsWith('/') ? path : `/${path}`
  const pageUrl = `${siteConfig.url}${canonicalPath}`
  const openGraphTitle = title ?? siteConfig.name
  const twitterTitle = title ?? siteConfig.name

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: openGraphType,
      url: pageUrl,
      title: openGraphTitle,
      description,
      siteName: siteConfig.name,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description,
      images: [image],
    },
  }
}
