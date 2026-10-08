import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import { PostService } from '@/services'

import { BLOG_POSTS_PER_PAGE } from '../../blog.constants'
import { buildPagedPostsMetadataImagePath } from './page.constants'

export const parseCurrentPage = (page: string) => {
  const currentPage = Number(page)

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    return null
  }

  return currentPage
}

export const getPagedPostsStaticParams = async () => {
  const { numbPages } = await PostService.getAll({
    limit: BLOG_POSTS_PER_PAGE,
  })

  if (numbPages <= 1) {
    return []
  }

  return Array.from({ length: numbPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }))
}

export const buildPagedPostsMetadata = (page: string): Metadata => {
  return buildPageMetadata({
    title: `Blog · Página ${page}`,
    description: `Página ${page} do arquivo de artigos de Diogo Rocha.`,
    path: `/blog/page/${page}`,
    image: buildPagedPostsMetadataImagePath(page),
    imageAlt: `Página ${page} do blog de Diogo Rocha`,
  })
}
