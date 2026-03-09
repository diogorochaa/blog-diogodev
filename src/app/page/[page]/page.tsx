import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { siteConfig } from '@/config'
import { paginationPages } from '@/functions'
import { PostService } from '@/services'

import { Reveal } from '@/components/Motion'
import { Pagination } from '@/components/Pagination'
import { PostsList } from '@/components/PostsList'

type PageProps = {
  params: { page: string }
}

const METADATA_IMAGE = `${siteConfig.url}/assets/images/logo.png`

export async function generateStaticParams() {
  const { numbPages } = await PostService.getAll()

  if (numbPages <= 1) {
    return []
  }

  return Array.from({ length: numbPages - 1 }, (_, index) => ({
    page: String(index + 2),
  }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const currentPage = Number(params.page)

  if (Number.isNaN(currentPage) || currentPage < 2) {
    return {
      title: 'Página não encontrada',
    }
  }

  const { posts } = await PostService.getAll({ currentPage })

  if (!posts.length) {
    return {
      title: 'Não há posts',
    }
  }

  return {
    title: `Página ${currentPage}`,
    description: `Página ${currentPage} com os posts mais recentes do blog.`,
    alternates: {
      canonical: `/page/${params.page}`,
    },
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/page/${params.page}`,
      title: 'Página ' + currentPage,
      description: `Página ${currentPage} com os posts mais recentes do blog.`,
      siteName: siteConfig.name,
      images: [
        {
          url: METADATA_IMAGE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: posts[0].frontmatter.title,
      description: posts[0].frontmatter.description,
      images: [METADATA_IMAGE],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const currentPage = Number(params.page)

  if (Number.isNaN(currentPage) || currentPage < 2) {
    notFound()
  }

  const { posts, numbPages } = await PostService.getAll({ currentPage })
  const { prevPage, nextPage } = paginationPages(currentPage)

  if (!posts.length) {
    notFound()
  }

  return (
    <div>
      <Reveal y={16}>
        <PostsList posts={posts} />
      </Reveal>

      <Reveal delay={0.1}>
        <Pagination
          currentPage={currentPage}
          numbPages={numbPages}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </Reveal>
    </div>
  )
}
