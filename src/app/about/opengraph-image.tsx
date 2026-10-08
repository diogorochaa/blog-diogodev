import { ImageResponse } from 'next/og'

import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

import { getAboutContent } from './about.data'

export const alt = 'Perfil de Diogo Rocha'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function AboutOpenGraphImage() {
  const content = await getAboutContent()

  return new ImageResponse(
    <BrandOgImage
      badge="Ficha do jogador"
      title={content.ogTitle}
      description={content.ogDescription}
    />,
    {
      ...size,
    },
  )
}
