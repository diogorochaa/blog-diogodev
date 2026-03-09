import { mainNavConfig } from '@/config'
import { Manrope, Sora } from 'next/font/google'

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

export const metadata = {
  title: {
    template: '%s | Diogo Rocha',
    default: 'Diogo Rocha',
  },
  description: 'Description',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sora.variable} scroll-smooth`}
    >
      <body className="bg-primary font-sans text-gray-100">
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
