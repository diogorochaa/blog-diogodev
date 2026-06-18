import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { GithubProfile } from '@/models'
import { ContentService, GithubService } from '@/services'

import type { PersonJsonLd } from './about.types'

export const getAboutContent = () => ContentService.getAboutContent()

export const getGithubProfile = () => GithubService.getProfile()

export const getGithubRepos = () => GithubService.getRepos()

export const buildAboutMetadata = async () => {
  const content = await getAboutContent()

  return buildPageMetadata({
    title: content.seoTitle,
    description: content.seoDescription,
    path: '/about',
    image: '/about/opengraph-image',
    imageAlt: `${content.ogTitle} | ${siteConfig.name}`,
  })
}

export const buildPersonJsonLd = (profile: GithubProfile): PersonJsonLd => {
  const displayLocation = profile.location || 'Brasil'
  const displayName = profile.name || 'Diogo Rocha'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: displayName,
    url: `${siteConfig.url}/about`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.instagram,
    ],
    jobTitle: siteConfig.title,
    description:
      profile.bio ||
      `Engenheiro de software com foco em performance, acessibilidade e boas práticas de desenvolvimento. Atualmente trabalho como desenvolvedor e moro em ${displayLocation}.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: displayLocation,
    },
  }
}
