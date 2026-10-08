import * as prismic from '@prismicio/client'

import { siteConfig } from '@/config'
import { getPlayerData } from '@/lib/player'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { GithubProfile, ProfileContent } from '@/models'
import { ContentService, GithubService } from '@/services'
import type { PlayerIdentity } from '@/utils/player-identity'

import type { PersonJsonLd } from './about.types'

export const getAboutContent = () => ContentService.getAboutContent()

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

export const getAboutPageData = async () => {
  const [aboutContent, player] = await Promise.all([
    getAboutContent(),
    getPlayerData(),
  ])
  const repos = await GithubService.getRepos(player.githubUsername)

  return {
    aboutContent,
    player,
    repos,
    githubUrl: GithubService.getProfileUrl(player.githubUsername),
  }
}

type BuildPersonJsonLdParams = {
  profile: ProfileContent | null
  github: GithubProfile
  identity: PlayerIdentity
}

export const buildPersonJsonLd = ({
  profile,
  github,
  identity,
}: BuildPersonJsonLdParams): PersonJsonLd => {
  const displayLocation = identity.location || github.location || 'Brasil'
  const profileBio = profile ? prismic.asText(profile.bio).trim() : ''

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name || 'Diogo Rocha',
    url: `${siteConfig.url}/about`,
    sameAs: identity.links
      .map((link) => link.href)
      .filter((href) => href.startsWith('http')),
    jobTitle: identity.role || siteConfig.title,
    description:
      profileBio ||
      github.bio ||
      `Engenheiro de software com foco em performance, acessibilidade e boas práticas de desenvolvimento. Atualmente trabalho como desenvolvedor e moro em ${displayLocation}.`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressLocality: displayLocation,
    },
  }
}
