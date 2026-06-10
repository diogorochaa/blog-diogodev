import type { TagProps } from './Tag.types'

export type { TagProps } from './Tag.types'

const sizeClasses = {
  xs: 'text-[0.65rem] px-2.5 py-1',
  sm: 'text-sm px-4 py-1.5',
  md: 'text-base px-4 py-1.5',
  lg: 'text-lg px-4 py-1.5',
}

export const Tag = ({ children, size = 'sm' }: TagProps) => {
  return (
    <span
      className={[
        'inline-flex rounded-full border border-accent-purple/50 bg-linear-to-r from-accent-purple/25 to-accent-cyan/20 font-semibold capitalize text-accent-cyan shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-sm transition-all duration-300 hover:border-accent-cyan/70 hover:text-white',
        sizeClasses[size],
      ].join(' ')}
    >
      {children}
    </span>
  )
}
