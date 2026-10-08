import type { RichTextField } from '@prismicio/client'

export type BlogPost = {
  slug: string
  /** Prismic document ID from the previous repository, used by old URLs. */
  legacyId?: string
  readingTime: number
  body: RichTextField
  frontmatter: {
    title: string
    description: string
    date: string
    tags: string[]
  }
}
