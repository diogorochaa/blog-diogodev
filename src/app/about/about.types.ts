import type { GithubProfile, ProfileContent, Repo } from '@/models'
import type { AboutContent } from '@/models/about-content'
import type { PlayerIdentity } from '@/utils/player-identity'

export type PersonJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url: string
  sameAs: string[]
  jobTitle: string
  description: string
  address: {
    '@type': 'PostalAddress'
    addressCountry: 'BR'
    addressLocality: string
  }
}

export type AboutPageContentProps = {
  aboutContent: AboutContent
  personJsonLd: PersonJsonLd
  profile: ProfileContent | null
  github: GithubProfile
  identity: PlayerIdentity
  repos: Repo[]
  githubUrl: string
}
