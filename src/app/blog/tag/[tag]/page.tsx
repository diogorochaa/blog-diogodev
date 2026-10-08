import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogArchive } from '@/components/BlogArchive'
import { findTagBySlug } from '@/lib/blog'

import { buildTagMetadata, getTagArchive, getTagStaticParams } from './tag.data'

export const revalidate = 60

export async function generateStaticParams() {
  return await getTagStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/tag/[tag]'>): Promise<Metadata> {
  const { tag: slug } = await params
  const tag = await findTagBySlug(slug)

  if (!tag) {
    return { title: 'Categoria não encontrada' }
  }

  return buildTagMetadata(tag.name, tag.slug)
}

export default async function BlogTagPage({
  params,
}: PageProps<'/blog/tag/[tag]'>) {
  const { tag } = await params
  const archive = await getTagArchive(tag)

  if (!archive) {
    notFound()
  }

  return <BlogArchive {...archive} />
}
