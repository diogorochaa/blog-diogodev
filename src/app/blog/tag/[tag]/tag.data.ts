import type { Metadata } from 'next'

import type { BlogArchiveProps } from '@/components/BlogArchive'
import { findTagBySlug, getArchiveTags, withStages } from '@/lib/blog'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import { PostService } from '@/services'

import { BLOG_LABEL } from '../../blog.constants'

export const getTagStaticParams = async () => {
  const tags = await getArchiveTags()
  return tags.map((tag) => ({ tag: tag.slug }))
}

export const buildTagMetadata = (tagName: string, slug: string): Metadata =>
  buildPageMetadata({
    title: `Artigos sobre ${tagName}`,
    description: `Artigos de Diogo Rocha na categoria ${tagName}.`,
    path: `/blog/tag/${slug}`,
    image: '/blog/opengraph-image',
    imageAlt: `Artigos sobre ${tagName}`,
  })

export const getTagArchive = async (
  slug: string,
): Promise<BlogArchiveProps | null> => {
  const [tag, tags] = await Promise.all([findTagBySlug(slug), getArchiveTags()])

  if (!tag) {
    return null
  }

  const posts = await PostService.getByTag(tag.name)

  return {
    title: `Categoria: ${tag.name}`,
    label: BLOG_LABEL,
    description: `${tag.count} ${tag.count === 1 ? 'artigo' : 'artigos'} na categoria ${tag.name}.`,
    breadcrumbs: [
      { label: 'Início', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: tag.name },
    ],
    posts: await withStages(posts),
    tags,
    activeTagSlug: tag.slug,
  }
}
