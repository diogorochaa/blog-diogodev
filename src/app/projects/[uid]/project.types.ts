import type { Project } from '@/models'

export type ProjectJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  description: string
  url: string
  inLanguage: 'pt-BR'
  keywords: string
  author: {
    '@type': 'Person'
    name: string
    url: string
  }
  image?: string
  codeRepository?: string
}

export type ProjectPageContentProps = {
  project: Project
  projectJsonLd: ProjectJsonLd
}
