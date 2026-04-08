import { siteConfig } from '@/config'

export const buildPostMetadataImagePath = (slug: string) =>
  `/${slug}/opengraph-image`

export const buildPostMetadataImageUrl = (slug: string) =>
  `${siteConfig.url}/${slug}/opengraph-image`
