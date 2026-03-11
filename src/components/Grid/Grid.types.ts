import type { ReactNode } from 'react'

export type GridProps = {
  children: ReactNode
  className?: string
  cols?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
  gap?: number
}
