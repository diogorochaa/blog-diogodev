import type { BlogPost, GithubProfile, Repo } from '@/models'
import { GithubService, PostService } from '@/services'
import { components } from '@/slices'
import type { PrismicSlice } from '@/slices/slice.types'
import { getNumberField, getTextField } from '@/slices/slice.types'

type SliceRendererProps = {
  slices?: PrismicSlice[]
  profile?: GithubProfile
  repos?: Repo[]
  posts?: BlogPost[]
}

const dynamicPostSliceTypes = new Set(['posts_feed', 'recommended_posts'])

const getSliceLimit = (slice: PrismicSlice, fallback: number) => {
  return Math.max(
    1,
    Math.trunc(getNumberField(slice.primary, 'limit', fallback)),
  )
}

const filterPosts = (
  slice: PrismicSlice,
  posts: BlogPost[],
  fallbackLimit: number,
) => {
  const source = getTextField(slice.primary, 'source', 'latest')
  const tag = getTextField(slice.primary, 'tag').toLowerCase()
  const limit = getSliceLimit(slice, fallbackLimit)
  const filteredPosts =
    source === 'tag' && tag
      ? posts.filter((post) =>
          post.frontmatter.tags.some(
            (postTag) => postTag.toLowerCase() === tag,
          ),
        )
      : posts

  return filteredPosts.slice(0, limit)
}

const needsPosts = (slices: PrismicSlice[]) => {
  return slices.some((slice) => dynamicPostSliceTypes.has(slice.slice_type))
}

const needsProfile = (slices: PrismicSlice[]) => {
  return slices.some((slice) => slice.slice_type === 'about_intro_stats')
}

const needsRepos = (slices: PrismicSlice[]) => {
  return slices.some((slice) => slice.slice_type === 'github_projects')
}

export const SliceRenderer = async ({
  slices = [],
  profile,
  repos,
  posts,
}: SliceRendererProps) => {
  if (slices.length === 0) {
    return null
  }

  const resolvedPosts =
    posts ??
    (needsPosts(slices) ? (await PostService.getAll({ limit: 100 })).posts : [])
  const resolvedProfile =
    profile ??
    (needsProfile(slices) ? await GithubService.getProfile() : undefined)
  const resolvedRepos =
    repos ?? (needsRepos(slices) ? await GithubService.getRepos() : [])

  return (
    <div className="flex flex-col gap-10 sm:gap-12">
      {slices.map((slice, index) => {
        const key = slice.id ?? `${slice.slice_type}-${index}`

        switch (slice.slice_type) {
          case 'profile_hero':
            return <components.profile_hero key={key} slice={slice} />
          case 'rich_text_section':
            return <components.rich_text_section key={key} slice={slice} />
          case 'table_section':
            return <components.table_section key={key} slice={slice} />
          case 'card_grid':
            return <components.card_grid key={key} slice={slice} />
          case 'about_intro_stats':
            return (
              <components.about_intro_stats
                key={key}
                slice={slice}
                profile={resolvedProfile}
              />
            )
          case 'technical_experience':
            return <components.technical_experience key={key} slice={slice} />
          case 'posts_feed':
            return (
              <components.posts_feed
                key={key}
                slice={slice}
                posts={filterPosts(slice, resolvedPosts, 6)}
              />
            )
          case 'github_projects': {
            const maxProjects = Math.max(
              1,
              Math.trunc(getNumberField(slice.primary, 'max_projects', 6)),
            )

            return (
              <components.github_projects
                key={key}
                slice={slice}
                repos={resolvedRepos.slice(0, maxProjects)}
              />
            )
          }
          case 'recommended_posts':
            return (
              <components.recommended_posts
                key={key}
                slice={slice}
                posts={filterPosts(slice, resolvedPosts, 2)}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
