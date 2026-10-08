import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogArchive } from '@/components/BlogArchive'

import { getBlogArchivePage } from '../../blog.data'
import {
  buildPagedPostsMetadata,
  getPagedPostsStaticParams,
  parseCurrentPage,
} from './page.data'

export const revalidate = 60

export async function generateStaticParams() {
  return await getPagedPostsStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/page/[page]'>): Promise<Metadata> {
  const { page } = await params

  if (!parseCurrentPage(page)) {
    return { title: 'Página não encontrada' }
  }

  return buildPagedPostsMetadata(page)
}

export default async function BlogPagedPage({
  params,
}: PageProps<'/blog/page/[page]'>) {
  const { page } = await params
  const currentPage = parseCurrentPage(page)

  if (!currentPage) {
    notFound()
  }

  const archive = await getBlogArchivePage(currentPage)

  if (!archive) {
    notFound()
  }

  return <BlogArchive {...archive} />
}
