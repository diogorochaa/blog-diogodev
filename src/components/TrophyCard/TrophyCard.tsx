import { PixelSprite } from '@/components/PixelSprite'

import type { TrophyCardProps } from './TrophyCard.types'

export const TrophyCard = ({
  title,
  value,
  description,
  year,
}: TrophyCardProps) => {
  return (
    <article className="pixel-frame flex h-full flex-col items-center gap-3 p-5 text-center">
      <PixelSprite name="trophy" scale={5} />
      {value !== undefined ? (
        <p className="font-pixel text-2xl text-score">{value}</p>
      ) : null}
      <h3 className="font-display text-base font-bold text-ink">{title}</h3>
      {description ? (
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      ) : null}
      {year ? (
        <p className="pixel-label mt-auto text-[9px] text-accent">{year}</p>
      ) : null}
    </article>
  )
}
