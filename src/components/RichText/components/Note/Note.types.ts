import type { ReactNode } from 'react'

export type NoteTypes = 'warning' | 'tip' | 'note'

export type NoteProps = {
  children: ReactNode
  type?: NoteTypes
}
