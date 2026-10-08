import type { Route } from 'next'
import NextLink from 'next/link'

import { PixelSprite } from '@/components/PixelSprite'

import type { GameSectionProps } from './GameSection.types'

export const GameSection = ({
  id,
  label,
  title,
  index,
  description,
  action,
  headingLevel = 'h2',
  className = '',
  children,
}: GameSectionProps) => {
  const titleId = `${id}-title`
  const Heading = headingLevel

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={['scroll-mt-28', className].filter(Boolean).join(' ')}
    >
      <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <p className="pixel-label on-pitch flex items-center gap-2 text-xs text-accent">
            <PixelSprite name="cursor" scale={2} />
            {index ? <span className="text-ink">{index}</span> : null}
            <span>{label}</span>
          </p>
          <Heading
            id={titleId}
            className="on-pitch text-2xl font-bold text-ink sm:text-3xl"
          >
            {title}
          </Heading>
          {description ? (
            <p className="on-pitch-soft max-w-2xl text-base leading-relaxed text-ink">
              {description}
            </p>
          ) : null}
        </div>

        {action ? (
          <NextLink
            href={action.href as Route}
            className="pixel-label inline-flex min-h-11 items-center gap-2 self-start border-2 border-line-strong bg-bg px-3 text-ink shadow-pixel transition-colors hover:border-accent hover:text-accent sm:self-auto"
          >
            {action.label}
            <span aria-hidden>→</span>
          </NextLink>
        ) : null}
      </header>

      {children}
    </section>
  )
}
