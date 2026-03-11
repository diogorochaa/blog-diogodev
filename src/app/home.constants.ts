import type { Metadata } from 'next'

import { siteConfig } from '@/config'

const OG_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export const homeMetadata: Metadata = {
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: OG_IMAGE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [OG_IMAGE],
  },
}
