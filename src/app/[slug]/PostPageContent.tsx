import { JsonLd } from '@/components/JsonLd'
import { Post } from '@/components/Post'

import type { PostPageContentProps } from './post.types'

export const PostPageContent = ({ post, postJsonLd }: PostPageContentProps) => {
  return (
    <>
      <JsonLd data={postJsonLd} />
      <Post post={post} />
    </>
  )
}
