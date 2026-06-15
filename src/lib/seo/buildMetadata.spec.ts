import { describe, expect, it } from 'vitest'

import { siteConfig } from '@/config'

import { buildPageMetadata } from './buildMetadata'

describe('buildPageMetadata', () => {
  it('builds canonical, open graph and twitter metadata', () => {
    const metadata = buildPageMetadata({
      title: 'Sobre mim',
      description: 'Descricao de teste',
      path: '/about',
      image: '/about/opengraph-image',
      imageAlt: 'Sobre mim | Blog diogodev_',
    })

    expect(metadata.title).toBe('Sobre mim')
    expect(metadata.description).toBe('Descricao de teste')
    expect(metadata.alternates?.canonical).toBe('/about')
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/about`)
    expect(metadata.openGraph?.locale).toBe('pt_BR')
    expect(metadata.twitter?.title).toBe('Sobre mim')
    expect(metadata.twitter?.site).toBe('@diogodev_')

    const ogImages = metadata.openGraph?.images

    if (!ogImages || !Array.isArray(ogImages)) {
      throw new Error('Expected open graph images array')
    }

    expect(ogImages[0]).toEqual(
      expect.objectContaining({
        url: '/about/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Sobre mim | Blog diogodev_',
      }),
    )
  })

  it('supports article metadata with published time, tags and authors', () => {
    const metadata = buildPageMetadata({
      title: 'Post teste',
      description: 'Resumo',
      path: '/post-teste',
      openGraphType: 'article',
      publishedTime: '2024-01-01',
      modifiedTime: '2024-01-02',
      authors: ['Diogo Rocha'],
      tags: ['nextjs', 'typescript'],
      section: 'nextjs',
    })

    const openGraph = metadata.openGraph as {
      type?: string
      publishedTime?: string
      modifiedTime?: string
      authors?: string[]
      tags?: string[]
      section?: string
    }

    expect(openGraph.type).toBe('article')
    expect(openGraph.publishedTime).toBe('2024-01-01')
    expect(openGraph.modifiedTime).toBe('2024-01-02')
    expect(openGraph.authors).toEqual(['Diogo Rocha'])
    expect(openGraph.tags).toEqual(['nextjs', 'typescript'])
    expect(openGraph.section).toBe('nextjs')
  })
})
