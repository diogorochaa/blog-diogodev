import { ImageResponse } from 'next/og'

import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

export const alt = 'Sobre mim | Blog diogodev_'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function AboutOpenGraphImage() {
  return new ImageResponse(
    <BrandOgImage
      badge="Sobre mim"
      title="Diogo Rocha"
      description="Trajetória, experiência e projetos em destaque."
      footer="blog.diogodev"
    />,
    {
      ...size,
    },
  )
}
