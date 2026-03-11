import { setDefaultResultOrder } from 'node:dns'

import * as prismic from '@prismicio/client'
import { CreateClientConfig, enableAutoPreviews } from '@prismicio/next'

// Some environments expose an IPv6 DNS result that is unreachable.
// Prioritizing IPv4 avoids transient connect timeouts to Prismic's CDN.
setDefaultResultOrder('ipv4first')

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME || ''

export const hasPrismicConfig = Boolean(repositoryName)

const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'post',
    path: '/:uid',
  },
]

export const createClient = (config: CreateClientConfig = {}) => {
  if (!hasPrismicConfig) {
    throw new Error('Missing PRISMIC_REPOSITORY_NAME environment variable.')
  }

  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes,
    ...config,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
  })

  enableAutoPreviews({ client, ...config })

  return client
}
