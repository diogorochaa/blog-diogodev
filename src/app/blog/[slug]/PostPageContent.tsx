import { PostWithToc } from '@/components/docs'
import { JsonLd } from '@/components/JsonLd'
import { Post } from '@/components/Post'
import { StageNav } from '@/components/StageNav'
import { buildPostTocItems } from '@/utils/toc'

import { buildPostBreadcrumbJsonLd } from './post.data'
import type { PostPageContentProps } from './post.types'

export const PostPageContent = ({
  post,
  postJsonLd,
  neighbors,
}: PostPageContentProps) => {
  const { items, titleId, headingIdsInOrder } = buildPostTocItems({
    title: post.frontmatter.title,
    slug: post.slug,
    body: post.body,
  })

  const breadcrumbJsonLd = buildPostBreadcrumbJsonLd(post)
  const hasStage = neighbors.stage > 0

  return (
    <main className="screen-enter flex flex-col gap-12">
      <JsonLd data={[postJsonLd, breadcrumbJsonLd]} />
      <PostWithToc items={items}>
        <Post
          post={post}
          titleId={titleId}
          headingIdsInOrder={headingIdsInOrder}
          stage={hasStage ? neighbors.stage : undefined}
          totalStages={hasStage ? neighbors.total : undefined}
        />
      </PostWithToc>
      {hasStage ? (
        <StageNav
          stage={neighbors.stage}
          previous={neighbors.previous}
          next={neighbors.next}
        />
      ) : null}
    </main>
  )
}
