import type { CareerEntry } from '@/models'

export type CareerTimelineProps = {
  entries: CareerEntry[]
  /** Compact shows role, company and period only; full adds the details. */
  variant?: 'compact' | 'full'
  headingLevel?: 'h2' | 'h3'
  /** Number of earlier seasons omitted from `entries`, keeps stage numbers. */
  stageOffset?: number
}
