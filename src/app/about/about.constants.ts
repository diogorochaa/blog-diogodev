import type { Metadata } from 'next'

import { siteConfig } from '@/config'
import { Profile } from '@/models'

export const GITHUB_USER = 'diogorochaa'
export const GITHUB_API_BASE_URL = 'https://api.github.com'

const ABOUT_DESCRIPTION =
  'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.'

const OG_IMAGE = '/opengraph-image'

export const githubFetchOptions = {
  next: { revalidate: 3600 },
  headers: {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
}

export const profileFallback: Profile = {
  avatar_url: '',
  name: 'Diogo Rocha',
  company: null,
  location: null,
  bio: null,
  public_repos: 0,
  followers: 0,
}

export const aboutMetadata: Metadata = {
  title: 'Sobre mim',
  description: ABOUT_DESCRIPTION,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    type: 'website',
    title: 'Sobre mim',
    url: `${siteConfig.url}/about`,
    description: ABOUT_DESCRIPTION,
    siteName: siteConfig.name,
    images: [
      {
        url: OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre mim',
    description: ABOUT_DESCRIPTION,
    images: [OG_IMAGE],
  },
}
