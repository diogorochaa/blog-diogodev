import type { RevealProps } from './Reveal.types'

export const Reveal = ({ children, className }: RevealProps) => {
  return <div className={className}>{children}</div>
}
