import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Motion'
import { Post } from '@/components/Post'

import type { PostPageContentProps } from './post.types'

export const PostPageContent = ({ post, postJsonLd }: PostPageContentProps) => {
  return (
    <>
      <JsonLd data={postJsonLd} />

      <Reveal y={16}>
        <Post post={post} />
      </Reveal>
    </>
  )
}
