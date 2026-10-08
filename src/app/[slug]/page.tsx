import type { Route } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { PostService } from '@/services'

export const revalidate = 60

/**
 * Posts used to live at `/<slug>`. Keeps old links and search results working
 * by answering with a 308 to the new `/blog/<slug>` URL.
 */
export default async function LegacyPostRedirect({
  params,
}: PageProps<'/[slug]'>) {
  const { slug } = await params
  const post = await PostService.getBySlug(slug)

  if (!post) {
    notFound()
  }

  permanentRedirect(`/blog/${post.slug}` as Route)
}
