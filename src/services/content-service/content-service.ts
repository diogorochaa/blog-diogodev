import * as prismic from '@prismicio/client'
import { cache } from 'react'

import type {
  AboutContent,
  ExperienceCategory,
  ExperienceContentEntry,
  HomeContent,
  PageContent,
} from '@/models'
import { createClient, hasPrismicConfig } from '@/prismicio'

import type {
  PrismicAboutData,
  PrismicAboutExperience,
  PrismicHomeData,
  PrismicPageData,
} from './content-service.types'

const VALID_CATEGORIES = new Set<ExperienceCategory>(['frontend', 'backend'])
const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}){1,2}$/i

const asString = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') {
    return fallback
  }

  const text = value.trim()
  return text || fallback
}

const asOptionalString = (value: unknown) => asString(value, '')

const asRichTextString = (
  value: prismic.RichTextField | string | undefined,
  fallback: string,
) => {
  if (typeof value === 'string') {
    return asString(value, fallback)
  }

  if (!value?.length) {
    return fallback
  }

  return prismic.asText(value).trim() || fallback
}

const asNumber = (value: unknown, fallback: number) => {
  const numberValue = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

const asPositiveInteger = (value: unknown, fallback: number) => {
  return Math.max(1, Math.trunc(asNumber(value, fallback)))
}

const asBoolean = (value: unknown, fallback = false) => {
  return typeof value === 'boolean' ? value : fallback
}

const asCategory = (value: unknown, fallback: ExperienceCategory) => {
  return typeof value === 'string' &&
    VALID_CATEGORIES.has(value as ExperienceCategory)
    ? (value as ExperienceCategory)
    : fallback
}

const asColor = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') {
    return fallback
  }

  const color = value.trim()
  return HEX_COLOR_PATTERN.test(color) ? color : fallback
}

const isPrismicSlice = (
  value: unknown,
): value is HomeContent['slices'][number] => {
  if (!value || typeof value !== 'object') {
    return false
  }

  return typeof (value as { slice_type?: unknown }).slice_type === 'string'
}

const asSlices = (value: unknown, fallback: HomeContent['slices']) => {
  return Array.isArray(value) ? value.filter(isPrismicSlice) : fallback
}

const mapExperience = (
  item: PrismicAboutExperience,
): ExperienceContentEntry => ({
  name: asOptionalString(item.name),
  startYear: asPositiveInteger(item.start_year, new Date().getFullYear()),
  color: asColor(item.color, '#22d3ee'),
  category: asCategory(item.category, 'frontend'),
  iconKey: asString(item.icon_key, 'CodeIcon'),
})

export const mapHomeContent = (data: PrismicHomeData): HomeContent => {
  return {
    heroBadge: asOptionalString(data.hero_badge),
    title: asOptionalString(data.title),
    subtitle: asRichTextString(data.subtitle, ''),
    description: asOptionalString(data.description),
    featuredPostsLimit: asPositiveInteger(data.featured_posts_limit, 10),
    slices: asSlices(data.slices, []),
    ogTitle: asOptionalString(data.og_title),
    ogDescription: asOptionalString(data.og_description),
  }
}

export const mapAboutContent = (data: PrismicAboutData): AboutContent => {
  const experiences =
    Array.isArray(data.experiences) && data.experiences.length > 0
      ? data.experiences.map(mapExperience).filter((item) => item.name)
      : []

  return {
    title: asOptionalString(data.title),
    greeting: asOptionalString(data.greeting),
    intro: asRichTextString(data.intro, ''),
    avatarAlt: asOptionalString(data.avatar_alt),
    reposLabel: asOptionalString(data.repos_label),
    followersLabel: asOptionalString(data.followers_label),
    experienceHeading: asOptionalString(data.experience_heading),
    experienceDescription: asOptionalString(data.experience_description),
    projectsHeading: asOptionalString(data.projects_heading),
    emptyProjectsText: asOptionalString(data.empty_projects_text),
    githubLinkLabel: asOptionalString(data.github_link_label),
    seoTitle: asOptionalString(data.seo_title),
    seoDescription: asOptionalString(data.seo_description),
    ogTitle: asOptionalString(data.og_title),
    ogDescription: asOptionalString(data.og_description),
    experiences,
    slices: asSlices(data.slices, []),
  }
}

export const mapPageContent = (
  uid: string,
  data?: PrismicPageData,
): PageContent => {
  const title = asString(data?.title, 'Página')

  return {
    uid,
    title,
    description: asString(data?.description, ''),
    showInHeader: asBoolean(data?.show_in_header),
    navLabel: asString(data?.nav_label, title),
    navOrder: Math.trunc(asNumber(data?.nav_order, 100)),
    showInFooter: asBoolean(data?.show_in_footer),
    footerLabel: asString(data?.footer_label, title),
    footerOrder: Math.trunc(asNumber(data?.footer_order, 100)),
    slices: asSlices(data?.slices, []),
  }
}

type PageNavigationConfig = {
  isVisible: (page: PageContent) => boolean
  getLabel: (page: PageContent) => string
  getOrder: (page: PageContent) => number
}

export const selectNavigationPages = (
  pages: PageContent[],
  { isVisible, getLabel, getOrder }: PageNavigationConfig,
) => {
  return pages
    .filter((page) => page.uid && isVisible(page))
    .sort((firstPage, secondPage) => {
      const firstOrder = getOrder(firstPage)
      const secondOrder = getOrder(secondPage)

      if (firstOrder !== secondOrder) {
        return firstOrder - secondOrder
      }

      return getLabel(firstPage).localeCompare(getLabel(secondPage), 'pt-BR')
    })
}

const getHomeDocument = cache(async () => {
  try {
    const client = createClient()
    const document = await client.getSingle('home')
    return mapHomeContent(document.data as PrismicHomeData)
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      throw new Error(
        'Required Prismic singleton "home" was not found. Publish the Home document before building.',
      )
    }

    throw error
  }
})

const getAboutDocument = cache(async () => {
  try {
    const client = createClient()
    const document = await client.getSingle('about')
    return mapAboutContent(document.data as PrismicAboutData)
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      throw new Error(
        'Required Prismic singleton "about" was not found. Publish the About document before building.',
      )
    }

    throw error
  }
})

const getPageByUID = cache(async (uid: string) => {
  if (!hasPrismicConfig) {
    return undefined
  }

  try {
    const client = createClient()
    const document = await client.getByUID('page', uid)
    return mapPageContent(document.uid ?? uid, document.data as PrismicPageData)
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return undefined
    }

    throw error
  }
})

const getPageDocuments = cache(async () => {
  if (!hasPrismicConfig) {
    return []
  }

  try {
    const client = createClient()
    return await client.getAllByType('page')
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return []
    }

    throw error
  }
})

const getPageUIDs = cache(async () => {
  const documents = await getPageDocuments()

  return documents.map((document) => document.uid).filter(Boolean)
})

const getAllPages = cache(async () => {
  const documents = await getPageDocuments()

  return documents.map((document) =>
    mapPageContent(document.uid ?? '', document.data as PrismicPageData),
  )
})

const getHeaderPages = cache(async () => {
  const pages = await getAllPages()

  return selectNavigationPages(pages, {
    isVisible: (page) => page.showInHeader,
    getLabel: (page) => page.navLabel,
    getOrder: (page) => page.navOrder,
  })
})

const getFooterPages = cache(async () => {
  const pages = await getAllPages()

  return selectNavigationPages(pages, {
    isVisible: (page) => page.showInFooter,
    getLabel: (page) => page.footerLabel,
    getOrder: (page) => page.footerOrder,
  })
})

export const ContentService = {
  getHomeContent: getHomeDocument,
  getAboutContent: getAboutDocument,
  getPageByUID,
  getPageUIDs,
  getHeaderPages,
  getFooterPages,
}
