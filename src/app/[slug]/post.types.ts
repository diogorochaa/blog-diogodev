import { BlogPost } from '@/models'

export type PostJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  mainEntityOfPage: string
  headline: string
  description: string
  datePublished: string
  dateModified: string
  url: string
  timeRequired: string
  author: {
    '@type': 'Person'
    name: string
    url: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
  image: string[]
}

export type PostPageContentProps = {
  post: BlogPost
  postJsonLd: PostJsonLd
}
