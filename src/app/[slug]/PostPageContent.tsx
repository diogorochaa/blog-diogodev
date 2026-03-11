import { Reveal } from '@/components/Motion'
import { Post } from '@/components/Post'

import { PostPageContentProps } from './post.types'

export const PostPageContent = ({ post, postJsonLd }: PostPageContentProps) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />

      <Reveal y={16}>
        <Post post={post} />
      </Reveal>
    </>
  )
}
