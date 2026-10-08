import { getPlayerData } from '@/lib/player'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import { GithubService, PortfolioService } from '@/services'

import { PROJECTS_DESCRIPTION, PROJECTS_TITLE } from './projects.constants'

export const projectsMetadata = buildPageMetadata({
  title: PROJECTS_TITLE,
  description: PROJECTS_DESCRIPTION,
  path: '/projects',
})

export const getProjectsPageData = async () => {
  const [projects, player] = await Promise.all([
    PortfolioService.getProjects(),
    getPlayerData(),
  ])
  const repos = await GithubService.getRepos(player.githubUsername)

  return {
    projects,
    repos,
    githubUrl: GithubService.getProfileUrl(player.githubUsername),
  }
}
