import { PixelSprite } from '@/components/PixelSprite'

import type { RetroEmptyStateProps } from './RetroEmptyState.types'

export const RetroEmptyState = ({
  title,
  description,
  sprite = 'ball',
  children,
}: RetroEmptyStateProps) => {
  return (
    <div className="pixel-frame flex flex-col items-center gap-4 px-6 py-10 text-center">
      <PixelSprite name={sprite} scale={6} />
      <p className="pixel-label text-ink">{title}</p>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}
