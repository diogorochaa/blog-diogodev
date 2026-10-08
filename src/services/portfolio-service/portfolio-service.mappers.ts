import {
  type CareerEntry,
  EDUCATION_LEVELS,
  INTEREST_CATEGORIES,
  type Interest,
  PROJECT_STATUSES,
  type ProfileContent,
  type Project,
  TACTICS_LINES,
} from '@/models'

import {
  asBoolean,
  asDateString,
  asGroup,
  asHttpUrl,
  asImage,
  asOneOf,
  asOptionalNumber,
  asOptionalString,
  asRichText,
  asStringList,
} from '../prismic-helpers'
import type {
  PrismicCareerData,
  PrismicInterestData,
  PrismicProfileData,
  PrismicProjectData,
} from './portfolio-service.types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const clampScore = (value: number) => Math.min(99, Math.max(0, value))

const splitList = (value: unknown) =>
  asOptionalString(value)
    .split(/[·,|]/)
    .map((item) => item.trim())
    .filter(Boolean)

export const mapProfileContent = (data: PrismicProfileData): ProfileContent => {
  const overall = asOptionalNumber(data.overall)
  const shirtNumber = asOptionalNumber(data.shirt_number)
  const email = asOptionalString(data.email)

  return {
    name: asOptionalString(data.name),
    role: asOptionalString(data.role),
    specialties: splitList(data.specialties),
    location: asOptionalString(data.location),
    avatar: asImage(data.avatar),
    bio: asRichText(data.bio),
    goals: asRichText(data.goals),
    currentlyStudying: asStringList(data.currently_studying, 'topic'),
    education: asGroup(data.education)
      .map((item) => {
        const endYear = asOptionalNumber(item.end_year)

        return {
          level: asOneOf(item.level, EDUCATION_LEVELS, 'Graduação'),
          course: asOptionalString(item.course),
          institution: asOptionalString(item.institution),
          location: asOptionalString(item.location),
          startYear: asOptionalNumber(item.start_year),
          endYear,
          inProgress: endYear === null,
        }
      })
      .filter((item) => item.course || item.institution),
    shirtNumber: shirtNumber === null ? null : Math.trunc(shirtNumber),
    position: asOptionalString(data.position),
    playStyle: asOptionalString(data.play_style),
    formation: asOptionalString(data.formation),
    overall: overall === null ? null : clampScore(Math.round(overall)),
    playerStats: asGroup(data.player_stats)
      .map((item) => ({
        label: asOptionalString(item.label),
        value: asOptionalNumber(item.value),
      }))
      .filter(
        (item): item is { label: string; value: number } =>
          Boolean(item.label) && item.value !== null,
      )
      .map((item) => ({ ...item, value: clampScore(Math.round(item.value)) })),
    tacticsTitle: asOptionalString(data.tactics_title),
    tacticsDescription: asOptionalString(data.tactics_description),
    tactics: asGroup(data.tactics)
      .map((item) => ({
        line: asOneOf(item.line, TACTICS_LINES, 'meio-campo'),
        label: asOptionalString(item.label),
        detail: asOptionalString(item.detail),
      }))
      .filter((item) => item.label),
    tacticsPrinciples: asStringList(data.tactics_principles, 'name'),
    trophies: asGroup(data.trophies)
      .map((item) => ({
        title: asOptionalString(item.title),
        description: asOptionalString(item.description),
        year: asOptionalString(item.year),
      }))
      .filter((item) => item.title),
    githubUsername: asOptionalString(data.github_username),
    links: {
      github: '',
      linkedin: asHttpUrl(data.linkedin_url),
      instagram: asHttpUrl(data.instagram_url),
      twitter: asHttpUrl(data.twitter_url),
      email: EMAIL_PATTERN.test(email) ? email : '',
    },
  }
}

export const mapProject = (uid: string, data: PrismicProjectData): Project => {
  return {
    uid,
    title: asOptionalString(data.title) || uid,
    shortDescription: asOptionalString(data.short_description),
    description: asRichText(data.description),
    coverImage: asImage(data.cover_image),
    gallery: asGroup(data.gallery)
      .map((item) => ({
        image: asImage(item.image),
        caption: asOptionalString(item.caption),
      }))
      .filter((item) => Boolean(item.image.url)),
    status: asOneOf(data.status, PROJECT_STATUSES, 'in_progress'),
    featured: asBoolean(data.featured),
    order: asOptionalNumber(data.order),
    category: asOptionalString(data.category),
    technologies: asStringList(data.technologies, 'name'),
    githubUrl: asHttpUrl(data.github_url),
    demoUrl: asHttpUrl(data.demo_url),
    problem: asRichText(data.problem),
    solution: asRichText(data.solution),
    architecture: asRichText(data.architecture),
    technicalDecisions: asRichText(data.technical_decisions),
    technicalChallenges: asRichText(data.technical_challenges),
    learnings: asRichText(data.learnings),
  }
}

export const mapCareerEntry = (
  id: string,
  data: PrismicCareerData,
): CareerEntry => {
  const endDate = asDateString(data.end_date)

  return {
    id,
    company: asOptionalString(data.company),
    role: asOptionalString(data.role),
    stageLabel: asOptionalString(data.stage_label),
    startDate: asDateString(data.start_date),
    endDate,
    isCurrent: !endDate,
    description: asRichText(data.description),
    responsibilities: asRichText(data.responsibilities),
    highlights: asStringList(data.highlights, 'text'),
    technologies: asStringList(data.technologies, 'name'),
    order: asOptionalNumber(data.order),
  }
}

export const mapInterest = (
  id: string,
  data: PrismicInterestData,
): Interest => {
  return {
    id,
    title: asOptionalString(data.title),
    category: asOneOf(data.category, INTEREST_CATEGORIES, 'technology'),
    description: asRichText(data.description),
    image: asImage(data.image),
    order: asOptionalNumber(data.order),
  }
}

export const isActive = (data: { active?: unknown }) =>
  asBoolean(data.active, true)

const compareOptionalOrder = (
  first: number | null,
  second: number | null,
): number => {
  if (first === null && second === null) return 0
  if (first === null) return 1
  if (second === null) return -1
  return first - second
}

export const sortProjects = (projects: Project[]) =>
  [...projects].sort(
    (first, second) =>
      compareOptionalOrder(first.order, second.order) ||
      first.title.localeCompare(second.title, 'pt-BR'),
  )

/** Chronological: the first season comes first, the current season last. */
export const sortCareer = (entries: CareerEntry[]) =>
  [...entries].sort(
    (first, second) =>
      compareOptionalOrder(first.order, second.order) ||
      first.startDate.localeCompare(second.startDate),
  )

export const sortInterests = (interests: Interest[]) =>
  [...interests].sort(
    (first, second) =>
      compareOptionalOrder(first.order, second.order) ||
      INTEREST_CATEGORIES.indexOf(first.category) -
        INTEREST_CATEGORIES.indexOf(second.category),
  )
