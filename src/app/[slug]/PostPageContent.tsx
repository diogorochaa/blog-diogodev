import { PostWithToc } from '@/components/docs'
import { JsonLd } from '@/components/JsonLd'
import { Post } from '@/components/Post'
import { buildPostTocItems } from '@/utils/toc'

import { buildPostBreadcrumbJsonLd } from './post.data'
import type { PostPageContentProps } from './post.types'

export const PostPageContent = ({ post, postJsonLd }: PostPageContentProps) => {
  const { items, titleId, headingIdsInOrder } = buildPostTocItems({
    title: post.frontmatter.title,
    slug: post.slug,
    body: post.body,
  })

  const breadcrumbJsonLd = buildPostBreadcrumbJsonLd(post)

  return (
    <>
      <JsonLd data={[postJsonLd, breadcrumbJsonLd]} />
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
