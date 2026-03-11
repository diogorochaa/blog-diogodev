import type { ReactNode } from 'react'

export type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  once?: boolean
}
