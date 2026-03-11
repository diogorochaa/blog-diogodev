import type { ReactNode } from 'react'

export type TagSize = 'xs' | 'sm' | 'md' | 'lg'

export type TagProps = {
  children: ReactNode
  size?: TagSize
}
