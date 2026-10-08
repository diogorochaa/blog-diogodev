import type { SpriteName } from './sprites'

export type PixelSpriteProps = {
  name: SpriteName
  /** Rendered size of one sprite pixel, in CSS pixels. */
  scale?: number
  className?: string
  /** When provided the sprite is exposed to assistive tech as an image. */
  label?: string
}
