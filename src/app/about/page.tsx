import { AboutPageContent } from './AboutPageContent'
import { aboutMetadata } from './about.constants'
import {
  buildPersonJsonLd,
  getGithubProfile,
  getGithubRepos,
} from './about.data'

export const metadata = aboutMetadata

export default async function AboutPage() {
  const [profile, repos] = await Promise.all([
    getGithubProfile(),
    getGithubRepos(),
  ])

  const personJsonLd = buildPersonJsonLd(profile)

  return (
    <AboutPageContent
      personJsonLd={personJsonLd}
      avatarUrl={profile.avatar_url}
      publicRepos={profile.public_repos}
      followers={profile.followers}
      repos={repos}
    />
  )
}
