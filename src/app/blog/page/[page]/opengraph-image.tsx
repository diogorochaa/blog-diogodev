import { ImageResponse } from 'next/og'

import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

export const alt = 'Arquivo paginado do blog de Diogo Rocha'
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
      title="Blog · Arquivo"
      description={`Página ${page} do arquivo de artigos de Diogo Rocha.`}
    />,
    { ...size },
  )
}
