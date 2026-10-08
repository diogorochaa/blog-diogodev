import type { ReactNode } from 'react'

export type GameSectionAction = {
  href: string
  label: string
}

export type GameSectionProps = {
  id: string
  /** Short arcade-style label shown above the title, e.g. "PLAYER CARD". */
  label: string
  title: string
  /** Optional ordinal shown before the label, e.g. "02". */
  index?: string
  description?: string
  action?: GameSectionAction
  /** Heading level for the title. Pages with their own h1 use the default h2. */
  headingLevel?: 'h1' | 'h2'
  className?: string
  children: ReactNode
}
