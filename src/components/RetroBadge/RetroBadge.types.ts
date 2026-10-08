import type { ReactNode } from 'react'

export type RetroBadgeVariant = 'default' | 'accent' | 'solid' | 'pitch'

export type RetroBadgeProps = {
  children: ReactNode
  variant?: RetroBadgeVariant
  className?: string
}
