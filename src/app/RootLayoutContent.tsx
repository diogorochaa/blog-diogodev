import Script from 'next/script'
import { BackToTop } from '@/components/BackToTop'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Layout } from '@/components/Layout'
import { mainNavConfig } from '@/config'

import { prismicScriptSrc } from './layout.constants'
import type { RootLayoutContentProps } from './layout.types'

export const RootLayoutContent = ({
  children,
  htmlClassName,
}: RootLayoutContentProps) => {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={htmlClassName}>
      <body className="bg-primary font-sans text-gray-100">
        {prismicScriptSrc ? (
          <Script async defer src={prismicScriptSrc} />
        ) : null}

        <Header />

        <Layout>
          <div className="animate-soft-in pt-24 pb-16 sm:pt-28 sm:pb-20">
            {children}
          </div>
        </Layout>

        <BackToTop />

        <Footer items={mainNavConfig.mainNav} />
      </body>
    </html>
  )
}
