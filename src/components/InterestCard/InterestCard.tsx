import * as prismic from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

import { CompactRichText } from '@/components/CompactRichText'
import { PixelSprite, type SpriteName } from '@/components/PixelSprite'
import type { InterestCategory } from '@/models'

import type { InterestCardProps } from './InterestCard.types'

const CATEGORY_VISUALS: Record<
  InterestCategory,
  { sprite: SpriteName; label: string }
> = {
  football: { sprite: 'ball', label: 'Dia de jogo' },
  cooking: { sprite: 'chef', label: 'Fora de campo' },
  retro_games: { sprite: 'controller', label: 'Insira a ficha' },
  technology: { sprite: 'terminal', label: 'Tecnologia' },
  learning: { sprite: 'book', label: 'Treino' },
  side_projects: { sprite: 'rocket', label: 'Projetos paralelos' },
}

export const InterestCard = ({
  interest,
  headingLevel = 'h3',
}: InterestCardProps) => {
  const Heading = headingLevel
  const visual = CATEGORY_VISUALS[interest.category]

  return (
    <article className="pixel-frame flex h-full flex-col overflow-hidden">
      {prismic.isFilled.image(interest.image) ? (
        <PrismicNextImage
          field={interest.image}
          className="aspect-video w-full border-b-2 border-line object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          fallbackAlt=""
        />
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="pixel-label text-[9px] text-accent">{visual.label}</p>
          <PixelSprite name={visual.sprite} scale={4} />
        </div>
        <Heading className="font-display text-xl font-bold text-ink">
          {interest.title}
        </Heading>
        {prismic.isFilled.richText(interest.description) ? (
          <CompactRichText field={interest.description} />
        ) : null}
      </div>
    </article>
  )
}
