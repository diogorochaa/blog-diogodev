import { siteConfig } from '@/config'
import { Profile, Repo } from '@/models'

import {
  GITHUB_API_BASE_URL,
  GITHUB_USER,
  githubFetchOptions,
  profileFallback,
} from './about.constants'
import { PersonJsonLd } from './about.types'

export async function getApiGithub(): Promise<Profile> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}`,
      githubFetchOptions,
    )

    if (!response.ok) {
      return profileFallback
    }

    return await response.json()
  } catch {
    return profileFallback
  }
}

export async function getApiGithubRepos(): Promise<Repo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE_URL}/users/${GITHUB_USER}/repos?sort=updated&per_page=6`,
      githubFetchOptions,
    )

    if (!response.ok) {
      return []
    }

    return await response.json()
  } catch {
    return []
  }
}

export const buildPersonJsonLd = (profile: Profile): PersonJsonLd => {
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
