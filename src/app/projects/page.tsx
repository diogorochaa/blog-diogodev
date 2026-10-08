import { ProjectsPageContent } from './ProjectsPageContent'
import { getProjectsPageData, projectsMetadata } from './projects.data'

export const revalidate = 60

export const metadata = projectsMetadata

export default async function ProjectsPage() {
  const data = await getProjectsPageData()

  return <ProjectsPageContent {...data} />
}
