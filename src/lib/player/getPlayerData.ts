import { cache } from 'react'

import { siteConfig } from '@/config'
import { GithubService, PortfolioService } from '@/services'
import { buildPlayerIdentity } from '@/utils/player-identity'

/**
 * Identity shared by Home, About and the footer: Prismic `profile` first,
 * GitHub profile for name/avatar, and the existing site links until the
 * profile document has its own social links.
 */
export const getPlayerData = cache(async () => {
  const profile = await PortfolioService.getProfile()
  const githubUsername = profile?.githubUsername || undefined
  const github = await GithubService.getProfile(githubUsername)

  const identity = buildPlayerIdentity({
    profile,
    github,
    githubUrl: GithubService.getProfileUrl(githubUsername),
    fallbackLinks: {
      linkedin: siteConfig.links.linkedin,
      instagram: siteConfig.links.instagram,
      twitter: siteConfig.links.twitter,
    },
  })

  return { profile, github, githubUsername, identity }
})
