import { fallbackAboutContent } from './about-content'

export type {
  ExperienceCategory as Category,
  ExperienceContentEntry as ExperienceEntry,
  ExperienceIconKey,
} from '@/models/experience'

export const experienceEntries = fallbackAboutContent.experiences
