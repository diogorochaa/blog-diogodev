import type { CareerEntry } from '@/models'

import type { buildCareerJsonLd } from './career.data'

export type CareerPageContentProps = {
  entries: CareerEntry[]
  careerJsonLd: ReturnType<typeof buildCareerJsonLd>
}
