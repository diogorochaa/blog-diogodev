import { NoteIcon, TipIcon, WarningIcon } from '@/components/Icons'

import type { NoteProps } from './Note.types'

const Icons = {
  note: <NoteIcon size={26} />,
  warning: <WarningIcon size={26} />,
  tip: <TipIcon size={26} />,
}

const Title = {
  note: 'Nota',
  warning: 'Atenção',
  tip: 'Dica',
}

const ColorClasses = {
  note: {
    container: 'border-accent-soft',
    text: 'text-accent-soft',
  },
  warning: {
    container: 'border-score',
    text: 'text-score',
  },
  tip: {
    container: 'border-pitch-line',
    text: 'text-ink',
  },
}

export const Note = ({ children, type = 'note' }: NoteProps) => {
  const icon = Icons[type]
  const color = ColorClasses[type]
  const title = Title[type]

  return (
    <div
      className={`mt-6 border-2 border-l-8 bg-surface px-6 py-4 ${color.container}`}
    >
      <div className={`mb-2 flex items-center gap-2 ${color.text}`}>
        {icon}
        <p className="text-xl font-semibold">{title}</p>
      </div>

      {children}
    </div>
  )
}
