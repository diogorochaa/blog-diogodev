import type { Project, Repo } from '@/models'

export type ProjectsPageContentProps = {
  projects: Project[]
  repos: Repo[]
  githubUrl: string
}
