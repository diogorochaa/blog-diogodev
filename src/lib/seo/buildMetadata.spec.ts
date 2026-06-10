import { describe, expect, it } from 'vitest'

import { siteConfig } from '@/config'

import { buildPageMetadata } from './buildMetadata'

describe('buildPageMetadata', () => {
  it('builds canonical, open graph and twitter metadata', () => {
    const metadata = buildPageMetadata({
      title: 'Sobre mim',
      description: 'Descricao de teste',
      path: '/about',
      image: '/opengraph-image',
    })

    expect(metadata.title).toBe('Sobre mim')
    expect(metadata.description).toBe('Descricao de teste')
    expect(metadata.alternates?.canonical).toBe('/about')
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/about`)
    expect(metadata.twitter?.title).toBe('Sobre mim')
  })

  it('supports article metadata with published time', () => {
    const metadata = buildPageMetadata({
      title: 'Post teste',
      description: 'Resumo',
      path: '/post-teste',
      openGraphType: 'article',
      publishedTime: '2024-01-01',
    })

    const openGraph = metadata.openGraph as {
      type?: string
      publishedTime?: string
    }

    expect(openGraph.type).toBe('article')
    expect(openGraph.publishedTime).toBe('2024-01-01')
  })
})
