import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { buildAuthorMetadata, buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { Project } from '@/models'
import { PortfolioService } from '@/services'

import type { ProjectJsonLd } from './project.types'

export const getProjectStaticParams = async () => {
  const uids = await PortfolioService.getProjectUIDs()
  return uids.map((uid) => ({ uid }))
}

export const getProjectByUID = (uid: string) =>
  PortfolioService.getProjectByUID(uid)

export const buildProjectMetadata = (project: Project): Metadata => {
  return buildPageMetadata({
    title: project.title,
    description:
      project.shortDescription || `Projeto ${project.title}, por Diogo Rocha.`,
    path: `/projects/${project.uid}`,
    image: project.coverImage.url ?? undefined,
    imageAlt: project.coverImage.alt || project.title,
    openGraphType: 'article',
    authors: buildAuthorMetadata(),
    tags: project.technologies,
    section: project.category || undefined,
  })
}

export const buildProjectJsonLd = (project: Project): ProjectJsonLd => {
  const url = `${siteConfig.url}/projects/${project.uid}`

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.shortDescription,
    url,
    inLanguage: 'pt-BR',
    keywords: project.technologies.join(', '),
    author: {
      '@type': 'Person',
      name: 'Diogo Rocha',
      url: `${siteConfig.url}/about`,
    },
    ...(project.coverImage.url ? { image: project.coverImage.url } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
  }
}
