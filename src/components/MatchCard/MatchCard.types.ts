export type MatchStatusTone = 'live' | 'final' | 'neutral'

export type MatchCardProps = {
  /** Opponent name: the project or repository. */
  title: string
  description: string
  tags: string[]
  href: string
  external?: boolean
  category?: string
  status: {
    label: string
    tone: MatchStatusTone
  }
  /** Extra footer info, e.g. repository stars. */
  meta?: string
  ctaLabel: string
  headingLevel?: 'h2' | 'h3'
}
