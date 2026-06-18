import type { Metadata } from 'next'

import { AboutPageContent } from './AboutPageContent'
import {
  buildAboutMetadata,
  buildPersonJsonLd,
  getAboutContent,
  getGithubProfile,
  getGithubRepos,
} from './about.data'

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  return await buildAboutMetadata()
}

export default async function AboutPage() {
  const [aboutContent, profile, repos] = await Promise.all([
    getAboutContent(),
    getGithubProfile(),
    getGithubRepos(),
  ])

  const personJsonLd = buildPersonJsonLd(profile)

  return (
    <AboutPageContent
      aboutContent={aboutContent}
      personJsonLd={personJsonLd}
      avatarUrl={profile.avatar_url}
      publicRepos={profile.public_repos}
      followers={profile.followers}
      repos={repos}
    />
  )
}
