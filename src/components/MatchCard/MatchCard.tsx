import type { Route } from 'next'
import NextLink from 'next/link'

import { RetroBadge } from '@/components/RetroBadge'

import type { MatchCardProps, MatchStatusTone } from './MatchCard.types'

const HOME_TEAM = 'Diogo FC'

const statusVariant: Record<MatchStatusTone, 'solid' | 'pitch' | 'default'> = {
  live: 'solid',
  final: 'pitch',
  neutral: 'default',
}

export const MatchCard = ({
  title,
  description,
  tags,
  href,
  external = false,
  category,
  status,
  meta,
  ctaLabel,
  headingLevel = 'h3',
}: MatchCardProps) => {
  const Heading = headingLevel
  const linkClassName =
    'after:absolute after:inset-0 after:content-[""] focus-visible:outline-none'

  return (
    <article className="pixel-frame-interactive group relative flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b-2 border-line px-4 py-3">
        <RetroBadge variant={statusVariant[status.tone]}>
          {status.tone === 'live' ? (
            <span aria-hidden className="animate-blink">
              ●
            </span>
          ) : null}
          {status.label}
        </RetroBadge>
        {category ? (
          <span className="pixel-label truncate text-[9px] text-muted">
            {category}
          </span>
        ) : null}
      </div>

      <div className="pitch-surface flex items-center justify-between gap-3 border-b-2 border-line-strong px-4 py-5">
        <span className="pixel-label on-pitch text-[10px] text-ink">
          {HOME_TEAM}
        </span>
        <span aria-hidden className="on-pitch font-pixel text-sm text-accent">
          X
        </span>
        <span className="pixel-label on-pitch max-w-[45%] truncate text-right text-[10px] text-score">
          {title}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <Heading className="font-display text-lg font-bold text-ink">
          {external ? (
            <a
              className={linkClassName}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          ) : (
            <NextLink className={linkClassName} href={href as Route}>
              {title}
            </NextLink>
          )}
        </Heading>

        {description ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        ) : null}

        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
            {tags.map((tag) => (
              <li
                key={tag}
                className="border-2 border-line bg-bg px-2 py-0.5 text-xs font-semibold text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="pixel-label text-[10px] text-accent transition-colors group-hover:text-ink">
            {ctaLabel} <span aria-hidden>→</span>
          </span>
          {meta ? <span className="text-xs text-muted">{meta}</span> : null}
        </div>
      </div>
    </article>
  )
}
