import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { PostService } from '@/services'

import { PAGED_POSTS_METADATA_IMAGE } from './page.constants'

export const parseCurrentPage = (page: string) => {
  const currentPage = Number(page)

  if (Number.isNaN(currentPage) || currentPage < 2) {
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
  currentPage,
  page,
  title,
  description,
}: {
  currentPage: number
  page: string
  title: string
  description: string
}): Metadata => {
  return {
    title,
    description,
    alternates: {
      canonical: `/page/${page}`,
    },
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/page/${page}`,
      title: `Página ${currentPage}`,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: PAGED_POSTS_METADATA_IMAGE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [PAGED_POSTS_METADATA_IMAGE],
    },
  }
}
