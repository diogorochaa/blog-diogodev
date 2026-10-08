import { ImageResponse } from 'next/og'

import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

import { BLOG_DESCRIPTION } from './blog.constants'

export const alt = 'Blog de Diogo Rocha'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function BlogOpenGraphImage() {
  return new ImageResponse(
    <BrandOgImage
      badge="Base de conhecimento"
      title="Blog"
      description={BLOG_DESCRIPTION}
    />,
    { ...size },
  )
}
