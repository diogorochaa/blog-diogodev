import { RichTextField } from '@prismicio/client'

export type BlogPost = {
  slug: string
  readingTime: number
  body: RichTextField
  frontmatter: {
    title: string
    description: string
    date: string
    tags: string[]
  }
}
