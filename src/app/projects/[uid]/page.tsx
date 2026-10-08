import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectPageContent } from './ProjectPageContent'
import {
  buildProjectJsonLd,
  buildProjectMetadata,
  getProjectByUID,
  getProjectStaticParams,
} from './project.data'

export const revalidate = 60

export async function generateStaticParams() {
  return await getProjectStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/projects/[uid]'>): Promise<Metadata> {
  const { uid } = await params
  const project = await getProjectByUID(uid)

  if (!project) {
    return { title: 'Projeto não encontrado' }
  }

  return buildProjectMetadata(project)
}

export default async function ProjectPage({
  params,
}: PageProps<'/projects/[uid]'>) {
  const { uid } = await params
  const project = await getProjectByUID(uid)

  if (!project) {
    notFound()
  }

  return (
    <ProjectPageContent
      project={project}
      projectJsonLd={buildProjectJsonLd(project)}
    />
  )
}
