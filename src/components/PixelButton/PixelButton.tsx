import type { Route } from 'next'
import NextLink from 'next/link'

import type { PixelButtonProps, PixelButtonVariant } from './PixelButton.types'

const baseClassName =
  'pixel-label inline-flex min-h-11 items-center justify-center gap-3 border-2 px-4 py-3 transition-[transform,box-shadow,background-color,color] duration-100 ease-[steps(2,end)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none motion-reduce:transition-none motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0'

const variantClassNames: Record<PixelButtonVariant, string> = {
  primary:
    'border-accent bg-accent text-bg shadow-pixel hover:shadow-[6px_6px_0_0_var(--color-outline)]',
  secondary:
    'border-ink bg-bg text-ink shadow-pixel hover:border-accent hover:text-accent hover:shadow-pixel-accent',
  ghost:
    'border-transparent bg-transparent text-ink hover:border-line-strong hover:bg-bg',
}

export const PixelButton = ({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  ariaLabel,
}: PixelButtonProps) => {
  const classes = [baseClassName, variantClassNames[variant], className]
    .filter(Boolean)
    .join(' ')

  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink className={classes} href={href as Route} aria-label={ariaLabel}>
      {children}
    </NextLink>
  )
}
