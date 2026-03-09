import type { Metadata } from 'next'
import { Manrope, Sora } from 'next/font/google'
import Script from 'next/script'

import { mainNavConfig, siteConfig } from '@/config'

import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'

import '../../styles/globals.css'

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

const OG_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export const metadata: Metadata = {
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
  manifest: '/manifest.json',
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
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@diogodev_',
    images: [OG_IMAGE],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${manrope.variable} ${sora.variable} scroll-smooth`}
    >
      <body className="bg-primary font-sans text-gray-100">
        <Script
          async
          defer
          src="https://static.cdn.prismic.io/prismic.js?new=true&repo=blog-diodev"
        />

        <Header />

        <Layout>
          <div className="pt-32 pb-20 animate-soft-in">{children}</div>
        </Layout>

        <BackToTop />

        <Footer items={mainNavConfig.mainNav} />
      </body>
    </html>
  )
}
