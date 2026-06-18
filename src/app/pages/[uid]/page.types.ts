import type { PageContent } from '@/models'

export type EditorialPageJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'WebPage'
  name: string
  description: string
  url: string
  inLanguage: 'pt-BR'
}

export type EditorialPageContentProps = {
  page: PageContent
  jsonLd: EditorialPageJsonLd
}
