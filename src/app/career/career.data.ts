import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'
import type { CareerEntry } from '@/models'
import { PortfolioService } from '@/services'

import { CAREER_DESCRIPTION, CAREER_TITLE } from './career.constants'

export const careerMetadata = buildPageMetadata({
  title: CAREER_TITLE,
  description: CAREER_DESCRIPTION,
  path: '/career',
})

export const getCareerPageData = () => PortfolioService.getCareer()

export const buildCareerJsonLd = (entries: CareerEntry[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: `${siteConfig.url}/career`,
  name: CAREER_TITLE,
  inLanguage: 'pt-BR',
  mainEntity: {
    '@type': 'Person',
    name: 'Diogo Rocha',
    jobTitle: siteConfig.title,
    url: `${siteConfig.url}/about`,
    ...(entries.length > 0
      ? {
          worksFor: entries
            .filter((entry) => entry.isCurrent)
            .map((entry) => ({ '@type': 'Organization', name: entry.company })),
        }
      : {}),
  },
})
