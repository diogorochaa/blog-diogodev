import * as prismic from '@prismicio/client'
import { cache } from 'react'

import type { CareerEntry, Interest, ProfileContent, Project } from '@/models'
import { createClient, hasPrismicConfig } from '@/prismicio'

import {
  isActive,
  mapCareerEntry,
  mapInterest,
  mapProfileContent,
  mapProject,
  sortCareer,
  sortInterests,
  sortProjects,
} from './portfolio-service.mappers'
import type {
  PrismicCareerData,
  PrismicInterestData,
  PrismicProfileData,
  PrismicProjectData,
} from './portfolio-service.types'

type OptionalDocumentType = 'project' | 'career' | 'interest'

const isNetworkError = (error: unknown) =>
  error instanceof Error &&
  /timeout|connect|fetch|econn|enotfound|eai_again/i.test(
    `${error.name} ${error.message}`,
  )

/**
 * Portfolio documents are optional: a missing document renders an empty
 * section instead of failing the build. Network failures still fail in
 * production so a broken CMS connection never publishes an empty site.
 */
const withOptionalContent = async <T>(
  load: () => Promise<T>,
  fallback: T,
): Promise<T> => {
  if (!hasPrismicConfig) {
    return fallback
  }

  try {
    return await load()
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return fallback
    }

    if (isNetworkError(error) && process.env.NODE_ENV !== 'production') {
      console.warn('Unable to reach Prismic for portfolio content.', error)
      return fallback
    }

    throw error
  }
}

const getAllByType = cache((type: OptionalDocumentType) =>
  withOptionalContent(() => createClient().getAllByType(type), []),
)

const getProfile = cache(
  (): Promise<ProfileContent | null> =>
    withOptionalContent(async () => {
      const document = await createClient().getSingle('profile')
      return mapProfileContent(document.data as PrismicProfileData)
    }, null),
)

const getProjects = cache(async (): Promise<Project[]> => {
  const documents = await getAllByType('project')

  return sortProjects(
    documents
      .filter((document) => document.uid)
      .map((document) =>
        mapProject(document.uid ?? '', document.data as PrismicProjectData),
      ),
  )
})

const getFeaturedProjects = async (limit = 3) => {
  const projects = await getProjects()
  const featured = projects.filter((project) => project.featured)

  return (featured.length > 0 ? featured : projects).slice(0, limit)
}

const getProjectByUID = async (uid: string) => {
  const projects = await getProjects()
  return projects.find((project) => project.uid === uid)
}

const getProjectUIDs = async () => {
  const projects = await getProjects()
  return projects.map((project) => project.uid)
}

const getCareer = cache(async (): Promise<CareerEntry[]> => {
  const documents = await getAllByType('career')

  return sortCareer(
    documents
      .filter((document) => isActive(document.data as PrismicCareerData))
      .map((document) =>
        mapCareerEntry(document.id, document.data as PrismicCareerData),
      )
      .filter((entry) => entry.company || entry.role),
  )
})

const getInterests = cache(async (): Promise<Interest[]> => {
  const documents = await getAllByType('interest')

  return sortInterests(
    documents
      .filter((document) => isActive(document.data as PrismicInterestData))
      .map((document) =>
        mapInterest(document.id, document.data as PrismicInterestData),
      )
      .filter((interest) => interest.title),
  )
})

export const PortfolioService = {
  getProfile,
  getProjects,
  getFeaturedProjects,
  getProjectByUID,
  getProjectUIDs,
  getCareer,
  getInterests,
}
