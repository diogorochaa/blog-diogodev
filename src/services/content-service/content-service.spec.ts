import { describe, expect, it } from 'vitest'

import { fallbackAboutContent, fallbackHomeContent } from '@/config'

import {
  mapAboutContent,
  mapHomeContent,
  mapPageContent,
  selectNavigationPages,
} from './content-service'

describe('ContentService mappers', () => {
  it('maps home singleton data with rich text subtitle', () => {
    const content = mapHomeContent({
      hero_badge: 'Blog técnico',
      title: 'Conteúdo editável',
      subtitle: [{ type: 'paragraph', text: 'Texto do Prismic', spans: [] }],
      description: 'Descrição SEO',
      featured_posts_limit: 4,
      og_title: 'OG Home',
      og_description: 'Descrição OG',
    })

    expect(content).toEqual({
      heroBadge: 'Blog técnico',
      title: 'Conteúdo editável',
      subtitle: 'Texto do Prismic',
      description: 'Descrição SEO',
      featuredPostsLimit: 4,
      slices: [],
      ogTitle: 'OG Home',
      ogDescription: 'Descrição OG',
    })
  })

  it('falls back home content when values are empty', () => {
    expect(mapHomeContent()).toEqual(fallbackHomeContent)
    expect(
      mapHomeContent({
        title: '',
        featured_posts_limit: 0,
      }).title,
    ).toBe(fallbackHomeContent.title)
  })

  it('maps about singleton data and sanitizes invalid experience values', () => {
    const content = mapAboutContent({
      title: 'Sobre',
      greeting: 'Oi',
      intro: [{ type: 'paragraph', text: 'Intro editável', spans: [] }],
      experiences: [
        {
          name: 'TypeScript',
          start_year: 2020,
          category: 'frontend',
          icon_key: 'typescript',
          color: '#3178c6',
        },
        {
          name: 'Inválido',
          start_year: 'abc',
          category: 'mobile',
          icon_key: 'unknown',
          color: 'blue',
        },
      ],
    })

    expect(content.title).toBe('Sobre')
    expect(content.greeting).toBe('Oi')
    expect(content.intro).toBe('Intro editável')
    expect(content.slices).toEqual([])
    expect(content.experiences[0]).toEqual({
      name: 'TypeScript',
      startYear: 2020,
      category: 'frontend',
      iconKey: 'typescript',
      color: '#3178c6',
    })
    expect(content.experiences[1]).toEqual({
      ...fallbackAboutContent.experiences[1],
      name: 'Inválido',
    })
  })

  it('maps page data with safe navigation and footer defaults', () => {
    const content = mapPageContent('labs', {
      title: 'Labs',
      description: 'Experimentos do blog',
      show_in_header: true,
      nav_label: '',
      nav_order: 2.9,
      show_in_footer: 'yes',
      footer_label: 'Rodapé Labs',
      footer_order: '3',
      slices: [{ slice_type: 'rich_text_section' }, { invalid: true }] as never,
    })

    expect(content).toEqual({
      uid: 'labs',
      title: 'Labs',
      description: 'Experimentos do blog',
      showInHeader: true,
      navLabel: 'Labs',
      navOrder: 2,
      showInFooter: false,
      footerLabel: 'Rodapé Labs',
      footerOrder: 3,
      slices: [{ slice_type: 'rich_text_section' }],
    })
  })

  it('selects visible navigation pages sorted by order and label', () => {
    const pages = [
      mapPageContent('hidden', {
        title: 'Hidden',
        show_in_header: false,
        nav_order: 1,
      }),
      mapPageContent('zeta', {
        title: 'Zeta',
        show_in_header: true,
        nav_order: 2,
      }),
      mapPageContent('alpha', {
        title: 'Alpha',
        show_in_header: true,
        nav_order: 2,
      }),
      mapPageContent('', {
        title: 'Empty UID',
        show_in_header: true,
        nav_order: 0,
      }),
    ]

    const visiblePages = selectNavigationPages(pages, {
      isVisible: (page) => page.showInHeader,
      getLabel: (page) => page.navLabel,
      getOrder: (page) => page.navOrder,
    })

    expect(visiblePages.map((page) => page.uid)).toEqual(['alpha', 'zeta'])
  })
})
