import { ArticleCard } from '@/components/ArticleCard'
import { GameOver } from '@/components/GameOver'

import type { SlugNotFoundContentProps } from './not-found.types'

export const SlugNotFoundContent = ({ posts }: SlugNotFoundContentProps) => {
  return (
    <GameOver
      title="Artigo não encontrado"
      description="Este artigo não existe ou foi removido do blog."
    >
      {posts.length > 0 ? (
        <section
          aria-labelledby="recommended-title"
          className="flex w-full flex-col gap-4"
        >
          <h2 id="recommended-title" className="pixel-label text-ink">
            Artigos recomendados
          </h2>
          <ol className="flex flex-col gap-3">
            {posts.map(({ post, stage }) => (
              <li key={post.slug}>
                <ArticleCard post={post} stage={stage} headingLevel="h3" />
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </GameOver>
  )
}
