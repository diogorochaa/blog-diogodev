import { ImageResponse } from 'next/og'

import { formatStage } from '@/components/ArticleCard'
import { siteConfig } from '@/config'
import {
  BrandOgImage,
  ogImageContentType,
  ogImageSize,
} from '@/lib/seo/og-image'

import { getPostBySlug, getPostNeighbors } from './post.data'

export const alt = 'Capa do artigo'
export const size = ogImageSize
export const contentType = ogImageContentType

type OpenGraphImageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params
  const [post, neighbors] = await Promise.all([
    getPostBySlug(slug),
    getPostNeighbors(slug),
  ])

  return new ImageResponse(
    <BrandOgImage
      badge={
        neighbors.stage > 0 ? `Fase ${formatStage(neighbors.stage)}` : 'Blog'
      }
      title={post?.frontmatter.title ?? 'Artigo não encontrado'}
      description={
        post?.frontmatter.description ??
        `Conteúdo do blog ${siteConfig.name} sobre desenvolvimento de software.`
      }
      chips={post?.frontmatter.tags ?? []}
      footer={post ? `${post.readingTime} min de leitura` : undefined}
    />,
    { ...size },
  )
}
