import type { HTMLAttributes, ReactNode } from 'react'

export type PreProps = HTMLAttributes<HTMLPreElement> & {
  children: ReactNode
  'data-language'?: string
}
