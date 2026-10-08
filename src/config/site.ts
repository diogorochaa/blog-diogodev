import type { SiteType } from '@/models'

const fallbackSiteUrl = 'http://localhost:3000'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl

export const siteConfig: SiteType = {
  name: 'Diogo FC | Diogo Rocha',
  description:
    'Portfólio e blog de Diogo Rocha, engenheiro de software: projetos, arquitetura, design de sistemas, IA e artigos técnicos.',
  title: 'Engenheiro de software',
  subtitle:
    'Portfólio de Diogo Rocha apresentado como um jogo de futebol retrô: projetos, carreira, arquitetura e artigos.',
  url: siteUrl,
  links: {
    instagram: 'https://www.instagram.com/diogodev_/',
    github: 'https://github.com/diogorochaa',
    linkedin: 'https://www.linkedin.com/in/diogorochaa/',
    twitter: 'https://www.twitter.com/Diogo99R/',
  },
}
