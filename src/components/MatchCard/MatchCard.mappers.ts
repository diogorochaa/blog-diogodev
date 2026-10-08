import type { Project, ProjectStatus, Repo } from '@/models'

import type { MatchCardProps } from './MatchCard.types'

export const PROJECT_STATUS_LABELS: Record<
  ProjectStatus,
  MatchCardProps['status']
> = {
  in_progress: { label: 'Ao vivo', tone: 'live' },
  completed: { label: 'Fim de jogo', tone: 'final' },
  archived: { label: 'Arquivado', tone: 'neutral' },
}

export const projectToMatchCard = (
  project: Project,
): Omit<MatchCardProps, 'headingLevel'> => ({
  title: project.title,
  description: project.shortDescription,
  tags: project.technologies.slice(0, 5),
  href: `/projects/${project.uid}`,
  category: project.category,
  status: PROJECT_STATUS_LABELS[project.status],
  ctaLabel: 'Ver partida',
})

export const repoToMatchCard = (
  repo: Repo,
): Omit<MatchCardProps, 'headingLevel'> => ({
  title: repo.name,
  description: repo.description ?? '',
  tags: repo.language ? [repo.language] : [],
  href: repo.html_url,
  external: true,
  category: 'GitHub',
  status: { label: 'Amistoso', tone: 'neutral' },
  meta: `★ ${repo.stargazers_count}`,
  ctaLabel: 'Ver repositório',
})
