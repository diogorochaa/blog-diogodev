import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { PageContent } from '@/models'
import { ContentService } from '@/services'

import type { EditorialPageJsonLd } from './page.types'

export const getEditorialPageByUID = (uid: string) => {
  return ContentService.getPageByUID(uid)
}

export const getEditorialPageStaticParams = async () => {
  const uids = await ContentService.getPageUIDs()

  return uids.map((uid) => ({ uid }))
}

export const buildEditorialPageMetadata = (page: PageContent) => {
  return buildPageMetadata({
    title: page.title,
    description: page.description || siteConfig.description,
    path: `/pages/${page.uid}`,
    imageAlt: `${page.title} | ${siteConfig.name}`,
  })
}

export const buildEditorialPageJsonLd = (
  page: PageContent,
): EditorialPageJsonLd => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description || siteConfig.description,
    url: `${siteConfig.url}/pages/${page.uid}`,
    inLanguage: 'pt-BR',
  }
}
