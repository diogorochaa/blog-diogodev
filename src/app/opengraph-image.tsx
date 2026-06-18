import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config'
import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

import { getHomeContent } from './home.data'

export const alt = siteConfig.name
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function OpenGraphImage() {
  const content = await getHomeContent()

  return new ImageResponse(
    <BrandOgImage
      badge="Blog"
      title={content.ogTitle || siteConfig.name}
      description={content.ogDescription || content.description}
      footer="diogodev_"
    />,
    {
      ...size,
    },
  )
}
