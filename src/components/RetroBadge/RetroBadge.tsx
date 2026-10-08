import type { RetroBadgeProps, RetroBadgeVariant } from './RetroBadge.types'

const variantClassNames: Record<RetroBadgeVariant, string> = {
  default: 'border-line-strong bg-bg text-muted',
  accent: 'border-accent bg-bg text-accent',
  solid: 'border-accent bg-accent text-bg',
  pitch: 'border-pitch-line bg-pitch text-ink',
}

export const RetroBadge = ({
  children,
  variant = 'default',
  className = '',
}: RetroBadgeProps) => {
  return (
    <span
      className={[
        'pixel-label inline-flex items-center gap-2 border-2 px-2 py-1 text-[9px] leading-none',
        variantClassNames[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
