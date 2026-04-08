import { AboutPageContent } from './AboutPageContent'
import { aboutMetadata } from './about.constants'
import {
  buildPersonJsonLd,
  getApiGithub,
  getApiGithubRepos,
} from './about.data'

export const metadata = aboutMetadata

export default async function AboutPage() {
  const [profile, repos] = await Promise.all([
    getApiGithub(),
    getApiGithubRepos(),
  ])

  const personJsonLd = buildPersonJsonLd(profile)

  return (
    <AboutPageContent
      personJsonLd={personJsonLd}
      publicRepos={profile.public_repos}
      followers={profile.followers}
      repos={repos}
    />
  )
}
