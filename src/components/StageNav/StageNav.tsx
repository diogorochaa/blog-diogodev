import type { Route } from 'next'
import NextLink from 'next/link'

import { formatStage } from '@/components/ArticleCard'
import type { BlogPost } from '@/models'

import type { StageNavProps } from './StageNav.types'

const StageLink = ({
  post,
  stage,
  direction,
}: {
  post: BlogPost
  stage: number
  direction: 'previous' | 'next'
}) => {
  const isNext = direction === 'next'

  return (
    <NextLink
      href={`/blog/${post.slug}` as Route}
      rel={isNext ? 'next' : 'prev'}
      className={`pixel-frame-interactive group flex h-full flex-col gap-2 border-2 border-line bg-surface p-4 sm:p-5 ${
        isNext ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="pixel-label text-[9px] text-muted">
        {isNext ? 'Próxima fase ▶' : '◀ Fase anterior'}{' '}
        <span className="text-accent">{formatStage(stage)}</span>
      </span>
      <span className="font-display text-base font-bold text-ink transition-colors group-hover:text-accent sm:text-lg">
        {post.frontmatter.title}
      </span>
    </NextLink>
  )
}

export const StageNav = ({ stage, previous, next }: StageNavProps) => {
  return (
    <nav
      aria-label="Navegação entre artigos"
      className="flex flex-col gap-4 border-t-2 border-line pt-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {previous ? (
            <StageLink post={previous} stage={stage - 1} direction="previous" />
          ) : null}
        </div>
        <div>
          {next ? (
            <StageLink post={next} stage={stage + 1} direction="next" />
          ) : null}
        </div>
      </div>
      <NextLink
        href="/blog"
        className="pixel-label inline-flex min-h-11 items-center gap-2 self-center border-2 border-line-strong bg-bg px-4 text-[10px] text-ink transition-colors hover:border-accent hover:text-accent"
      >
        <span aria-hidden>▤</span>
        Voltar ao blog
      </NextLink>
    </nav>
  )
}
