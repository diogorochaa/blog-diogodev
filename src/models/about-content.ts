import type { PrismicSlice } from '@/slices/slice.types'
import type { ExperienceContentEntry } from './experience'

export type AboutContent = {
  title: string
  greeting: string
  intro: string
  avatarAlt: string
  reposLabel: string
  followersLabel: string
  experienceHeading: string
  experienceDescription: string
  projectsHeading: string
  emptyProjectsText: string
  githubLinkLabel: string
  seoTitle: string
  seoDescription: string
  ogTitle: string
  ogDescription: string
  experiences: ExperienceContentEntry[]
  slices: PrismicSlice[]
}
