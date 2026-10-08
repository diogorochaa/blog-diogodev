import type { BlogPost } from '@/models'

export type StageNavProps = {
  stage: number
  previous: BlogPost | null
  next: BlogPost | null
}
