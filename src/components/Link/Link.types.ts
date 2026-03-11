import type { AnchorHTMLAttributes, ReactNode } from 'react'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}
