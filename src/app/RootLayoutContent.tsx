import Script from 'next/script'
import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'

import { prismicScriptSrc } from './layout.constants'
import type { RootLayoutContentProps } from './layout.types'

export const RootLayoutContent = ({
  children,
  htmlClassName,
}: RootLayoutContentProps) => {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={htmlClassName}>
      <body className="font-sans text-ink antialiased">
        {prismicScriptSrc ? (
          <Script async defer src={prismicScriptSrc} />
        ) : null}

        <Header />

        <Layout>
          <div
            id="main-content"
            tabIndex={-1}
            className="pt-24 pb-16 focus:outline-none sm:pt-28 sm:pb-20"
          >
            {children}
          </div>
        </Layout>

        <BackToTop />

        <Footer />
      </body>
    </html>
  )
}
