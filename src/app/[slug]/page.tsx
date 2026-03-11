import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { PostPageContent } from './PostPageContent'
import {
  buildPostJsonLd,
  buildPostMetadata,
  getPostBySlug,
  getPostStaticParams,
} from './post.data'

export async function generateStaticParams() {
  return await getPostStaticParams()
}

export async function generateMetadata({
  params,
}: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return buildPostMetadata(post)
}

export default async function PostPage({ params }: PageProps<'/[slug]'>) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const postJsonLd = buildPostJsonLd(post)

  return <PostPageContent post={post} postJsonLd={postJsonLd} />
}
