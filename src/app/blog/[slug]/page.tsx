import type { Metadata, Route } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'

import { PostPageContent } from './PostPageContent'
import {
  buildPostJsonLd,
  buildPostMetadata,
  getPostBySlug,
  getPostNeighbors,
  getPostStaticParams,
} from './post.data'

export const revalidate = 60

export async function generateStaticParams() {
  return await getPostStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return buildPostMetadata(post)
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  if (post.slug !== slug) {
    permanentRedirect(`/blog/${post.slug}` as Route)
  }

  const neighbors = await getPostNeighbors(post.slug)

  return (
    <PostPageContent
      post={post}
      postJsonLd={buildPostJsonLd(post)}
      neighbors={neighbors}
    />
  )
}
