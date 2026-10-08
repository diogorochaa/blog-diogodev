import type { BlogPost } from '@/models'
import { PostService } from '@/services'
import { toTagSlug } from '@/utils'

export type ArchiveTag = {
  name: string
  slug: string
  count: number
}

export type StagedPost = {
  post: BlogPost
  stage: number
}

export const getArchiveTags = async (): Promise<ArchiveTag[]> => {
  const tags = await PostService.getAllTags()

  return tags.map((tag) => ({ ...tag, slug: toTagSlug(tag.name) }))
}

export const findTagBySlug = async (slug: string) => {
  const tags = await getArchiveTags()
  return tags.find((tag) => tag.slug === slug) ?? null
}

/** Stage = chronological position of the article (oldest = 1). */
export const withStages = async (posts: BlogPost[]): Promise<StagedPost[]> => {
  const slugs = await PostService.getAllSlugs()
  const total = slugs.length

  return posts.map((post) => {
    const index = slugs.indexOf(post.slug)
    return { post, stage: index === -1 ? 0 : total - index }
  })
}
