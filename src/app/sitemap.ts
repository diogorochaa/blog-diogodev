import type { MetadataRoute } from 'next'

import { siteConfig } from '@/config'
import { PostService } from '@/services'

const toAbsoluteUrl = (path: string) => new URL(path, siteConfig.url).toString()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ numbPages }, slugs] = await Promise.all([
    PostService.getAll(),
    PostService.getAllSlugs(),
  ])
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteUrl('/'),
      lastModified,
    },
    {
      url: toAbsoluteUrl('/about'),
      lastModified,
    },
  ]

  const paginationRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, numbPages - 1) },
    (_, index) => ({
      url: toAbsoluteUrl(`/page/${index + 2}`),
      lastModified,
    }),
  )

  const postRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: toAbsoluteUrl(`/${slug}`),
    lastModified,
  }))

  return [...staticRoutes, ...paginationRoutes, ...postRoutes]
}
