import { notFound } from 'next/navigation'

import { BlogArchive } from '@/components/BlogArchive'

import { blogMetadata, getBlogArchivePage } from './blog.data'

export const revalidate = 60

export const metadata = blogMetadata

export default async function BlogPage() {
  const archive = await getBlogArchivePage(1)

  if (!archive) {
    notFound()
  }

  return <BlogArchive {...archive} />
}
