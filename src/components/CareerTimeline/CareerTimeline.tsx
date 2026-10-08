import * as prismic from '@prismicio/client'

import { CompactRichText } from '@/components/CompactRichText'
import { RetroBadge } from '@/components/RetroBadge'
import { formatCareerPeriod } from '@/utils/player-identity'

import type { CareerTimelineProps } from './CareerTimeline.types'

const toStageNumber = (index: number) => String(index + 1).padStart(2, '0')

export const CareerTimeline = ({
  entries,
  variant = 'compact',
  headingLevel = 'h3',
  stageOffset = 0,
}: CareerTimelineProps) => {
  const Heading = headingLevel
  const isFull = variant === 'full'

  return (
    <ol className="relative flex flex-col gap-4 before:absolute before:top-2 before:bottom-2 before:left-[1.1rem] before:w-0.5 before:bg-line sm:gap-6">
      {entries.map((entry, index) => {
        const period = formatCareerPeriod(
          entry.startDate,
          entry.endDate,
          entry.isCurrent,
        )

        return (
          <li key={entry.id} className="relative flex gap-4 sm:gap-6">
            <span
              aria-hidden
              className={[
                'relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center border-2 font-pixel text-[10px]',
                entry.isCurrent
                  ? 'border-accent bg-accent text-bg'
                  : 'border-line-strong bg-bg text-muted',
              ].join(' ')}
            >
              {toStageNumber(stageOffset + index)}
            </span>

            <article
              className={[
                'flex min-w-0 flex-1 flex-col gap-3 border-2 bg-surface p-4 sm:p-5',
                entry.isCurrent ? 'border-accent' : 'border-line',
              ].join(' ')}
            >
              <div className="flex flex-wrap items-center gap-2">
                {entry.stageLabel ? (
                  <RetroBadge variant={entry.isCurrent ? 'solid' : 'default'}>
                    {entry.stageLabel}
                  </RetroBadge>
                ) : null}
                {entry.isCurrent ? (
                  <RetroBadge variant="accent">Temporada atual</RetroBadge>
                ) : null}
              </div>

              <Heading className="font-display text-lg font-bold text-ink sm:text-xl">
                {entry.role}
                {entry.company ? (
                  <span className="text-muted"> · {entry.company}</span>
                ) : null}
              </Heading>

              {period ? (
                <p className="pixel-label text-[9px] text-muted">{period}</p>
              ) : null}

              {isFull && prismic.isFilled.richText(entry.description) ? (
                <CompactRichText field={entry.description} />
              ) : null}

              {isFull && prismic.isFilled.richText(entry.responsibilities) ? (
                <div className="flex flex-col gap-2">
                  <p className="pixel-label text-[9px] text-ink">
                    Responsabilidades
                  </p>
                  <CompactRichText field={entry.responsibilities} />
                </div>
              ) : null}

              {isFull && entry.highlights.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <p className="pixel-label text-[9px] text-ink">Destaques</p>
                  <ul className="flex flex-col gap-2 pl-5 text-muted [list-style-type:square] marker:text-score">
                    {entry.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {entry.technologies.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Tecnologias">
                  {entry.technologies.map((technology) => (
                    <li
                      key={technology}
                      className="border-2 border-line bg-bg px-2 py-0.5 text-xs font-semibold text-ink"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </li>
        )
      })}
    </ol>
  )
}
