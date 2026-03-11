import type { Route } from 'next'

import { BlogPost } from '@/models'

export type HomeWebsiteJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  inLanguage: 'pt-BR'
  description: string
}

export type HomeBlogJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Blog'
  name: string
  url: string
  description: string
  inLanguage: 'pt-BR'
  blogPost: Array<{
    '@type': 'BlogPosting'
    headline: string
    description: string
    datePublished: string
    url: string
    timeRequired: string
  }>
}

export type HomePageContentProps = {
  websiteJsonLd: HomeWebsiteJsonLd
  blogJsonLd: HomeBlogJsonLd
  posts: BlogPost[]
  currentPage: number
  numbPages: number
  totalPosts: number
  postsPerPage: number
  prevPage: Route
  nextPage: Route
}
