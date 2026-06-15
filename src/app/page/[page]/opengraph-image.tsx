import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config'
import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

export const alt = 'Posts paginados do blog diogodev_'
export const size = ogImageSize
export const contentType = ogImageContentType

type OpenGraphImageProps = {
  params: Promise<{
    page: string
  }>
}

export default async function PagedPostsOpenGraphImage({
  params,
}: OpenGraphImageProps) {
  const { page } = await params

  return new ImageResponse(
    <BrandOgImage
      badge={`Página ${page}`}
      title="Posts recentes"
      description={`Página ${page} com os artigos mais recentes do ${siteConfig.name}.`}
      footer={siteConfig.name}
    />,
    {
      ...size,
    },
  )
}
