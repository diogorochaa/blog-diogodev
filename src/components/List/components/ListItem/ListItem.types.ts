import type { LiHTMLAttributes, ReactNode } from 'react'

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children: ReactNode
}
