import type { HTMLAttributes, ReactNode } from 'react'

export type ListProps = HTMLAttributes<HTMLUListElement> & {
  children: ReactNode
}
