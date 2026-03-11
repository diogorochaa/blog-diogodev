import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { paginationPages } from '@/utils'

import { PagedPostsContent } from './PagedPostsContent'
import {
  buildPagedPostsMetadata,
  getPagedPosts,
  getPagedPostsStaticParams,
  parseCurrentPage,
} from './page.data'

export async function generateStaticParams() {
  return await getPagedPostsStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/page/[page]'>): Promise<Metadata> {
  const { page } = await params
  const currentPage = parseCurrentPage(page)

  if (!currentPage) {
    return {
      title: 'Página não encontrada',
    }
  }

  const { posts } = await getPagedPosts(currentPage)

  if (!posts.length) {
    return {
      title: 'Não há posts',
    }
  }

  const title = `Página ${currentPage}`
  const description = `Página ${currentPage} com os posts mais recentes do blog.`

  return buildPagedPostsMetadata({
    currentPage,
    page,
    title,
    description,
  })
}

export default async function Page({ params }: PageProps<'/page/[page]'>) {
  const { page } = await params
  const currentPage = parseCurrentPage(page)

  if (!currentPage) {
    notFound()
  }

  const { posts, numbPages, totalPosts, postsPerPage } = await getPagedPosts(
    currentPage,
  )
  const { prevPage, nextPage } = paginationPages(currentPage)

  if (!posts.length) {
    notFound()
  }

  return <PagedPostsContent
    posts={posts}
    currentPage={currentPage}
    numbPages={numbPages}
    totalPosts={totalPosts}
    postsPerPage={postsPerPage}
    prevPage={prevPage}
    nextPage={nextPage}
  />
}
