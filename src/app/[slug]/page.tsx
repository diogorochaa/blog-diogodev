import type { Metadata } from 'next'
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

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
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
    alternates: {
      canonical: `/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      url: `${siteConfig.url}/${post.slug}`,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      publishedTime: post.frontmatter.date,
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

  const postJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: `${siteConfig.url}/${post.slug}`,
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date,
    url: `${siteConfig.url}/${post.slug}`,
    timeRequired: `PT${post.readingTime}M`,
    author: {
      '@type': 'Person',
      name: 'Diogo Rocha',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: METADATA_IMAGE,
      },
    },
    image: [METADATA_IMAGE],
  }

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
