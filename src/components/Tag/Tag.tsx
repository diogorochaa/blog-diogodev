import type { TagProps } from './Tag.types'

export type { TagProps } from './Tag.types'

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export const Tag = ({ children, size = 'sm' }: TagProps) => {
  return (
    <p
      className={[
        'rounded-full border border-accent-purple/30 bg-linear-to-r from-accent-purple/20 to-accent-cyan/20 px-4 py-1.5 font-medium capitalize text-accent-cyan transition-all duration-300 hover:scale-105 hover:border-accent-cyan/60 hover:shadow-glow-cyan',
        sizeClasses[size],
      ].join(' ')}
    >
      {children}
    </p>
  )
}
