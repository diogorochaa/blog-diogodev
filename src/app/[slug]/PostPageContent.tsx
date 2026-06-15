import { PostWithToc } from '@/components/docs'
import { JsonLd } from '@/components/JsonLd'
import { Post } from '@/components/Post'
import { buildPostTocItems } from '@/utils/toc'

import type { PostPageContentProps } from './post.types'

export const PostPageContent = ({ post, postJsonLd }: PostPageContentProps) => {
  const { items, titleId, headingIdsInOrder } = buildPostTocItems({
    title: post.frontmatter.title,
    slug: post.slug,
    body: post.body,
  })

  return (
    <>
      <JsonLd data={postJsonLd} />
      <PostWithToc items={items}>
        <Post
          post={post}
          titleId={titleId}
          headingIdsInOrder={headingIdsInOrder}
        />
      </PostWithToc>
    </>
  )
}
