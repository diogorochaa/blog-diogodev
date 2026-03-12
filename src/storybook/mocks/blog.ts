import type * as prismic from '@prismicio/client'

import type { BlogPost, LocalNavItem } from '@/models'

const emptyBody: prismic.RichTextField = []

export const mockPosts: BlogPost[] = [
  {
    slug: 'arquitetura-nextjs-prismic',
    readingTime: 8,
    body: emptyBody,
    frontmatter: {
      title: 'Arquitetura Next.js + Prismic para blogs escalaveis',
      description:
        'Como estruturar paginas, servicos e componentes para manter o crescimento do projeto sem perder legibilidade.',
      date: '2026-03-07T10:00:00.000Z',
      tags: ['nextjs', 'prismic', 'arquitetura'],
    },
  },
  {
    slug: 'storybook-como-documentar-componentes',
    readingTime: 6,
    body: emptyBody,
    frontmatter: {
      title: 'Storybook: documentacao viva de componentes',
      description:
        'Padroes para transformar seu design system em referencia de uso para todo o time.',
      date: '2026-03-05T14:30:00.000Z',
      tags: ['storybook', 'frontend'],
    },
  },
  {
    slug: 'tailwind-v4-na-pratica',
    readingTime: 5,
    body: emptyBody,
    frontmatter: {
      title: 'Tailwind v4 na pratica: migracao sem dor',
      description:
        'Licoes aprendidas durante a migracao para o novo plugin PostCSS e ajustes de build.',
      date: '2026-02-27T09:15:00.000Z',
      tags: ['tailwind', 'css'],
    },
  },
  {
    slug: 'seo-tecnico-no-app-router',
    readingTime: 7,
    body: emptyBody,
    frontmatter: {
      title: 'SEO tecnico no App Router',
      description:
        'Sitemap, robots e metadados dinamicos para melhorar indexacao e compartilhamento.',
      date: '2026-02-21T11:45:00.000Z',
      tags: ['seo', 'nextjs'],
    },
  },
  {
    slug: 'observabilidade-para-frontend',
    readingTime: 4,
    body: emptyBody,
    frontmatter: {
      title: 'Observabilidade para frontend moderno',
      description:
        'Boas praticas para logs, erros e monitoracao de experiencia real de usuario.',
      date: '2026-02-16T08:00:00.000Z',
      tags: ['observabilidade', 'frontend'],
    },
  },
  {
    slug: 'tipagem-rotas-next16',
    readingTime: 6,
    body: emptyBody,
    frontmatter: {
      title: 'Tipagem de rotas no Next 16',
      description:
        'Como usar typed routes com seguranca em links internos e paginacao.',
      date: '2026-02-10T13:00:00.000Z',
      tags: ['typescript', 'nextjs'],
    },
  },
]

export const mockFooterItems: LocalNavItem[] = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Sobre mim',
    href: '/about',
  },
]
