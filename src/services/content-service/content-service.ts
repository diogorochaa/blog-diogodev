import * as prismic from '@prismicio/client'
import { cache } from 'react'

import { fallbackAboutContent, fallbackHomeContent } from '@/config'
import type {
  AboutContent,
  ExperienceCategory,
  ExperienceContentEntry,
  ExperienceIconKey,
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
const VALID_ICON_KEYS = new Set<ExperienceIconKey>([
  'javascript',
  'typescript',
  'css',
  'html',
  'react',
  'nextjs',
  'nodejs',
  'docker',
  'database',
  'cloud',
  'git',
  'terminal',
  'code',
])

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}){1,2}$/i

const asString = (value: unknown, fallback: string) => {
  if (typeof value !== 'string') {
    return fallback
  }

  const text = value.trim()
  return text || fallback
}

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

const asIconKey = (value: unknown, fallback: ExperienceIconKey) => {
  return typeof value === 'string' &&
    VALID_ICON_KEYS.has(value as ExperienceIconKey)
    ? (value as ExperienceIconKey)
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
  fallback: ExperienceContentEntry,
): ExperienceContentEntry => ({
  name: asString(item.name, fallback.name),
  startYear: asPositiveInteger(item.start_year, fallback.startYear),
  color: asColor(item.color, fallback.color),
  category: asCategory(item.category, fallback.category),
  iconKey: asIconKey(item.icon_key, fallback.iconKey),
})

export const mapHomeContent = (data?: PrismicHomeData): HomeContent => {
  if (!data) {
    return fallbackHomeContent
  }

  return {
    heroBadge: asString(data.hero_badge, fallbackHomeContent.heroBadge),
    title: asString(data.title, fallbackHomeContent.title),
    subtitle: asRichTextString(data.subtitle, fallbackHomeContent.subtitle),
    description: asString(data.description, fallbackHomeContent.description),
    featuredPostsLimit: asPositiveInteger(
      data.featured_posts_limit,
      fallbackHomeContent.featuredPostsLimit,
    ),
    slices: asSlices(data.slices, fallbackHomeContent.slices),
    ogTitle: asString(data.og_title, fallbackHomeContent.ogTitle),
    ogDescription: asString(
      data.og_description,
      fallbackHomeContent.ogDescription,
    ),
  }
}

export const mapAboutContent = (data?: PrismicAboutData): AboutContent => {
  if (!data) {
    return fallbackAboutContent
  }

  const experiences =
    Array.isArray(data.experiences) && data.experiences.length > 0
      ? data.experiences.map((item, index) =>
          mapExperience(
            item,
            fallbackAboutContent.experiences[
              index % fallbackAboutContent.experiences.length
            ],
          ),
        )
      : fallbackAboutContent.experiences

  return {
    title: asString(data.title, fallbackAboutContent.title),
    greeting: asString(data.greeting, fallbackAboutContent.greeting),
    intro: asRichTextString(data.intro, fallbackAboutContent.intro),
    avatarAlt: asString(data.avatar_alt, fallbackAboutContent.avatarAlt),
    reposLabel: asString(data.repos_label, fallbackAboutContent.reposLabel),
    followersLabel: asString(
      data.followers_label,
      fallbackAboutContent.followersLabel,
    ),
    experienceHeading: asString(
      data.experience_heading,
      fallbackAboutContent.experienceHeading,
    ),
    experienceDescription: asString(
      data.experience_description,
      fallbackAboutContent.experienceDescription,
    ),
    projectsHeading: asString(
      data.projects_heading,
      fallbackAboutContent.projectsHeading,
    ),
    emptyProjectsText: asString(
      data.empty_projects_text,
      fallbackAboutContent.emptyProjectsText,
    ),
    githubLinkLabel: asString(
      data.github_link_label,
      fallbackAboutContent.githubLinkLabel,
    ),
    seoTitle: asString(data.seo_title, fallbackAboutContent.seoTitle),
    seoDescription: asString(
      data.seo_description,
      fallbackAboutContent.seoDescription,
    ),
    ogTitle: asString(data.og_title, fallbackAboutContent.ogTitle),
    ogDescription: asString(
      data.og_description,
      fallbackAboutContent.ogDescription,
    ),
    experiences,
    slices: asSlices(data.slices, fallbackAboutContent.slices),
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
  if (!hasPrismicConfig) {
    return fallbackHomeContent
  }

  try {
    const client = createClient()
    const document = await client.getSingle('home')
    return mapHomeContent(document.data as PrismicHomeData)
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return fallbackHomeContent
    }

    throw error
  }
})

const getAboutDocument = cache(async () => {
  if (!hasPrismicConfig) {
    return fallbackAboutContent
  }

  try {
    const client = createClient()
    const document = await client.getSingle('about')
    return mapAboutContent(document.data as PrismicAboutData)
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return fallbackAboutContent
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
