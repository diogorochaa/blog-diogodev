import { describe, expect, it, vi } from 'vitest'

import { siteConfig } from '@/config'
import type { PageContent } from '@/models'

import {
  buildEditorialPageJsonLd,
  buildEditorialPageMetadata,
  getEditorialPageStaticParams,
} from './page.data'

const serviceMocks = vi.hoisted(() => ({
  getPageUIDs: vi.fn(),
}))

vi.mock('@/services', () => ({
  ContentService: {
    getPageByUID: vi.fn(),
    getPageUIDs: serviceMocks.getPageUIDs,
  },
}))

const makePage = (overrides: Partial<PageContent> = {}): PageContent => ({
  uid: 'labs',
  title: 'Labs',
  description: 'Experimentos do blog',
  showInHeader: false,
  navLabel: 'Labs',
  navOrder: 100,
  showInFooter: false,
  footerLabel: 'Labs',
  footerOrder: 100,
  slices: [],
  ...overrides,
})

describe('editorial page data', () => {
  it('builds static params from Prismic page UIDs', async () => {
    serviceMocks.getPageUIDs.mockResolvedValue(['labs', 'recursos'])

    await expect(getEditorialPageStaticParams()).resolves.toEqual([
      { uid: 'labs' },
      { uid: 'recursos' },
    ])
  })

  it('builds metadata with canonical path and fallback description', () => {
    const metadata = buildEditorialPageMetadata(
      makePage({
        description: '',
      }),
    )

    expect(metadata.title).toBe('Labs')
    expect(metadata.alternates?.canonical).toBe('/pages/labs')
    expect(metadata.description).toBe(siteConfig.description)
    expect(metadata.openGraph?.images).toEqual([
      expect.objectContaining({
        alt: `Labs | ${siteConfig.name}`,
      }),
    ])
  })

  it('builds WebPage JSON-LD for editorial pages', () => {
    expect(buildEditorialPageJsonLd(makePage())).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Labs',
      description: 'Experimentos do blog',
      url: 'http://localhost:3000/pages/labs',
      inLanguage: 'pt-BR',
    })
  })
})
