import { PostsList } from '@/components/PostsList'
import { SectionHeading } from '@/components/SectionHeading'
import type { BlogPost } from '@/models'

import type { PrismicSlice } from '../slice.types'
import { getTextField } from '../slice.types'

type PostsFeedSliceProps = {
  slice: PrismicSlice
  posts: BlogPost[]
}

export const PostsFeed = ({ slice, posts }: PostsFeedSliceProps) => {
  const primary = slice.primary
  const heading = getTextField(primary, 'heading')
  const description = getTextField(primary, 'description')
  const layout = getTextField(primary, 'layout', 'grid')

  if (posts.length === 0) {
    return null
  }

  return (
    <section>
      {heading ? (
        <SectionHeading title={heading} description={description} />
      ) : null}
      <PostsList posts={posts} layout={layout === 'home' ? 'home' : 'grid'} />
    </section>
  )
}

export default PostsFeed
