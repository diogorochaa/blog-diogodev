import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config'
import { getArchiveTags } from '@/lib/blog'
import { PortfolioService, PostService } from '@/services'

import { BLOG_POSTS_PER_PAGE } from './blog/blog.constants'

export const revalidate = 60

const toAbsoluteUrl = (path: string) => new URL(path, siteConfig.url).toString()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ numbPages }, slugs, tags, projectUids] = await Promise.all([
    PostService.getAll({ limit: BLOG_POSTS_PER_PAGE }),
    PostService.getAllSlugs(),
    getArchiveTags(),
    PortfolioService.getProjectUIDs(),
  ])
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/projects',
    '/career',
    '/blog',
  ].map((path) => ({ url: toAbsoluteUrl(path), lastModified }))

  const paginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, numbPages - 1) },
    (_, index) => ({
      url: toAbsoluteUrl(`/blog/page/${index + 2}`),
      lastModified,
    }),
  )

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: toAbsoluteUrl(`/blog/tag/${tag.slug}`),
    lastModified,
  }))

  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: toAbsoluteUrl(`/blog/${slug}`),
    lastModified,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectUids.map((uid) => ({
    url: toAbsoluteUrl(`/projects/${uid}`),
    lastModified,
  }))

  return [
    ...staticRoutes,
    ...paginationRoutes,
    ...tagRoutes,
    ...postRoutes,
    ...projectRoutes,
  ]
}
