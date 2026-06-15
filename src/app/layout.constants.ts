import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'

import { siteConfig } from '@/config'
import {
  OG_IMAGE_SIZE,
  TWITTER_CREATOR,
  TWITTER_SITE,
} from '@/lib/seo/metadata.constants'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
})

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
})

const OG_IMAGE = '/opengraph-image'

export const rootHtmlClassName = `${manrope.variable} ${sora.variable} scroll-smooth`

const prismicRepositoryName = process.env.PRISMIC_REPOSITORY_NAME ?? ''

export const prismicScriptSrc = prismicRepositoryName
  ? `https://static.cdn.prismic.io/prismic.js?new=true&repo=${prismicRepositoryName}`
  : null

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  keywords: [
    'desenvolvimento web',
    'next.js',
    'typescript',
    'prismic',
    'frontend',
    'backend',
  ],
  authors: [{ name: 'Diogo Rocha', url: siteConfig.url }],
  creator: 'Diogo Rocha',
  publisher: 'Diogo Rocha',
  category: 'Tecnologia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_SIZE.width,
        height: OG_IMAGE_SIZE.height,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_SITE,
    title: siteConfig.name,
    description: siteConfig.description,
    creator: TWITTER_CREATOR,
    images: [OG_IMAGE],
  },
}
