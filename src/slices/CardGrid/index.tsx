'use client'

import * as prismic from '@prismicio/client'

import { Grid } from '@/components/Grid'
import { SectionHeading } from '@/components/SectionHeading'

import { renderIcon } from '../icon-map'
import type { PrismicSlice } from '../slice.types'
import { getItems, getTextField } from '../slice.types'

type CardGridProps = {
  slice: PrismicSlice
}

const getColumns = (value: string) => {
  const columns = Number(value)
  return [2, 3, 4].includes(columns) ? columns : 3
}

const getAccentColor = (value: unknown) => {
  return typeof value === 'string' && value.trim() ? value.trim() : '#22d3ee'
}

export const CardGrid = ({ slice }: CardGridProps) => {
  const primary = slice.primary
  const eyebrow = getTextField(primary, 'eyebrow')
  const title = getTextField(primary, 'title')
  const description = getTextField(primary, 'description')
  const columns = getColumns(getTextField(primary, 'columns', '3'))
  const cards = getItems(slice)

  if (!title && cards.length === 0) {
    return null
  }

  return (
    <section>
      {title ? (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      ) : null}

      <Grid sm={1} md={2} lg={columns} gap={6}>
        {cards.map((card) => {
          const cardTitle = getTextField(card, 'title')
          const cardDescription = getTextField(card, 'description')
          const accent = getAccentColor(card.accent)
          const link = card.link as prismic.LinkField | undefined
          const href = link ? prismic.asLink(link) : null
          const cardKey =
            [cardTitle, cardDescription, href].filter(Boolean).join('-') ||
            JSON.stringify(card)
          const content = (
            <div
              key={cardKey}
              className="card-vivid h-full p-5 transition-colors hover:border-accent"
            >
              <div className="mb-4 flex items-center gap-3">
                {renderIcon(card.icon_key, accent)}
                {cardTitle ? (
                  <h3 className="text-lg font-semibold text-ink">
                    {cardTitle}
                  </h3>
                ) : null}
              </div>

              {cardDescription ? (
                <p className="text-sm leading-relaxed text-muted">
                  {cardDescription}
                </p>
              ) : null}
            </div>
          )

          return href ? (
            <a key={cardKey} href={href}>
              {content}
            </a>
          ) : (
            <div key={cardKey}>{content}</div>
          )
        })}
      </Grid>
    </section>
  )
}

export default CardGrid
