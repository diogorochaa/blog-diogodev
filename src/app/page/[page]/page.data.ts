import type { Metadata } from 'next'

import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import { PostService } from '@/services'

import { PAGED_POSTS_METADATA_IMAGE } from './page.constants'

export const parseCurrentPage = (page: string) => {
  const currentPage = Number(page)

  if (!Number.isInteger(currentPage) || currentPage < 2) {
    return null
  }

  return currentPage
}

export const getPagedPostsStaticParams = async () => {
  const { numbPages } = await PostService.getAll()

  if (numbPages <= 1) {
    return []
  }

  return Array.from({ length: numbPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }))
}

export const getPagedPosts = async (currentPage: number) => {
  return await PostService.getAll({ currentPage })
}

export const buildPagedPostsMetadata = ({
  page,
  title,
  description,
}: {
  page: string
  title: string
  description: string
}): Metadata => {
  return buildPageMetadata({
    title,
    description,
    path: `/page/${page}`,
    image: PAGED_POSTS_METADATA_IMAGE,
  })
}
