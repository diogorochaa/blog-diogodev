import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { EditorialPageContent } from './EditorialPageContent'
import {
  buildEditorialPageJsonLd,
  buildEditorialPageMetadata,
  getEditorialPageByUID,
  getEditorialPageStaticParams,
} from './page.data'

export const revalidate = 60

export async function generateStaticParams() {
  return await getEditorialPageStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/pages/[uid]'>): Promise<Metadata> {
  const { uid } = await params
  const page = await getEditorialPageByUID(uid)

  if (!page) {
    return {
      title: 'Página não encontrada',
    }
  }

  return buildEditorialPageMetadata(page)
}

export default async function EditorialPage({
  params,
}: PageProps<'/pages/[uid]'>) {
  const { uid } = await params
  const page = await getEditorialPageByUID(uid)

  if (!page) {
    notFound()
  }

  const jsonLd = buildEditorialPageJsonLd(page)

  return <EditorialPageContent page={page} jsonLd={jsonLd} />
}
