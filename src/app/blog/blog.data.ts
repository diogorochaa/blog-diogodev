import type { BlogArchiveProps } from '@/components/BlogArchive'
import { getArchiveTags, withStages } from '@/lib/blog'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import { PostService } from '@/services'
import { paginationPages } from '@/utils'

import {
  BLOG_DESCRIPTION,
  BLOG_LABEL,
  BLOG_POSTS_PER_PAGE,
  BLOG_TITLE,
} from './blog.constants'

export const blogMetadata = buildPageMetadata({
  title: BLOG_TITLE,
  description: BLOG_DESCRIPTION,
  path: '/blog',
  image: '/blog/opengraph-image',
  imageAlt: 'Blog de Diogo Rocha',
})

/** Returns null when the page is out of range. */
export const getBlogArchivePage = async (
  currentPage: number,
): Promise<BlogArchiveProps | null> => {
  const [result, tags] = await Promise.all([
    PostService.getAll({ currentPage, limit: BLOG_POSTS_PER_PAGE }),
    getArchiveTags(),
  ])

  if (
    currentPage > 1 &&
    (currentPage > result.numbPages || !result.posts.length)
  ) {
    return null
  }

  const { prevPage, nextPage } = paginationPages(currentPage)
  const isFirstPage = currentPage === 1

  return {
    title: isFirstPage ? BLOG_TITLE : `${BLOG_TITLE} · Página ${currentPage}`,
    label: BLOG_LABEL,
    description: BLOG_DESCRIPTION,
    breadcrumbs: isFirstPage
      ? [{ label: 'Início', href: '/' }, { label: 'Blog' }]
      : [
          { label: 'Início', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: `Página ${currentPage}` },
        ],
    posts: await withStages(result.posts),
    tags,
    pagination: {
      currentPage,
      numbPages: result.numbPages,
      totalPosts: result.totalPosts,
      postsPerPage: result.postsPerPage,
      prevPage,
      nextPage,
    },
  }
}
