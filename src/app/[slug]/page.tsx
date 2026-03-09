import { notFound } from 'next/navigation'

import { siteConfig } from '@/config'
import { PostService } from '@/services'

import { Reveal } from '@/components/Motion'
import { Post } from '@/components/Post'

type PostPageProps = {
  params: { slug: string }
}

const METADATA_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export async function generateStaticParams() {
  const slugs = await PostService.getAllSlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = params
  const post = await PostService.getBySlug(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/${post.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      siteName: siteConfig.name,
      images: [
        {
          url: METADATA_IMAGE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [METADATA_IMAGE],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await PostService.getBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <Reveal y={16}>
      <Post post={post} />
    </Reveal>
  )
}
