import { formatYears, getYearsSince } from '@/utils'
import { AboutPageContent } from './AboutPageContent'
import { aboutMetadata, PROFILE_START_YEAR } from './about.constants'
import { buildPersonJsonLd, getApiGithub, getApiGithubRepos } from './about.data'

export const metadata = aboutMetadata

export default async function AboutPage() {
  const [profile, repos] = await Promise.all([
    getApiGithub(),
    getApiGithubRepos(),
  ])

  const companyText = profile.company ? `no ${profile.company}` : 'como desenvolvedor'
  const locationText = profile.location || 'Brasil'
  const introText =
    profile.bio ||
    `Atualmente trabalho ${companyText} e moro em ${locationText}.`

  const personJsonLd = buildPersonJsonLd(profile)

  return (
    <AboutPageContent
      personJsonLd={personJsonLd}
      introText={introText}
      yearsOfExperienceLabel={formatYears(getYearsSince(PROFILE_START_YEAR))}
      publicRepos={profile.public_repos}
      followers={profile.followers}
      repos={repos}
    />
  )
}
