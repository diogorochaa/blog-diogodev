import { siteConfig } from '@/config'

export const buildPostPath = (slug: string) => `/blog/${slug}`

export const buildPostMetadataImagePath = (slug: string) =>
  `${buildPostPath(slug)}/opengraph-image`

export const buildPostMetadataImageUrl = (slug: string) =>
  `${siteConfig.url}${buildPostMetadataImagePath(slug)}`
