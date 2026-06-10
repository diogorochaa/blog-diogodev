import { siteConfig } from '@/config'
import { buildPageMetadata } from '@/lib/seo/buildMetadata'

export const homeMetadata = buildPageMetadata({
  description: siteConfig.description,
  path: '/',
})
