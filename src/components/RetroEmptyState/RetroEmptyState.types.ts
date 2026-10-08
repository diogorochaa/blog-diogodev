import type { ReactNode } from 'react'

import type { SpriteName } from '@/components/PixelSprite'

export type RetroEmptyStateProps = {
  title: string
  description?: string
  sprite?: SpriteName
  children?: ReactNode
}
