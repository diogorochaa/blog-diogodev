import { buildPageMetadata } from '@/lib/seo/buildMetadata'

const ABOUT_DESCRIPTION =
  'Conheça mais sobre Diogo Rocha, trajetória e projetos em destaque.'

export const aboutMetadata = buildPageMetadata({
  title: 'Sobre mim',
  description: ABOUT_DESCRIPTION,
  path: '/about',
  image: '/about/opengraph-image',
  imageAlt: 'Sobre mim | Blog diogodev_',
})
