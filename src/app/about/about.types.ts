import { Repo } from '@/models'

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
  personJsonLd: PersonJsonLd
  introText: string
  yearsOfExperienceLabel: string
  publicRepos: number
  followers: number
  repos: Repo[]
}
