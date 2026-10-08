import type { Metadata } from 'next'

import { AboutPageContent } from './AboutPageContent'
import {
  buildAboutMetadata,
  buildPersonJsonLd,
  getAboutPageData,
} from './about.data'

export const revalidate = 60

export const generateMetadata = async (): Promise<Metadata> => {
  return await buildAboutMetadata()
}

export default async function AboutPage() {
  const { aboutContent, player, repos, githubUrl } = await getAboutPageData()

  return (
    <AboutPageContent
      aboutContent={aboutContent}
      personJsonLd={buildPersonJsonLd(player)}
      profile={player.profile}
      github={player.github}
      identity={player.identity}
      repos={repos}
      githubUrl={githubUrl}
    />
  )
}
