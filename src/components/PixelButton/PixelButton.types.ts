import type { ReactNode } from 'react'

export type PixelButtonVariant = 'primary' | 'secondary' | 'ghost'

export type PixelButtonProps = {
  href: string
  children: ReactNode
  variant?: PixelButtonVariant
  /** Opens in a new tab and skips client-side routing. */
  external?: boolean
  className?: string
  ariaLabel?: string
}
