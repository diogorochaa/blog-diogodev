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
    container: 'bg-blue-400/30',
    text: 'text-blue-400',
  },
  warning: {
    container: 'bg-red-400/30',
    text: 'text-red-400',
  },
  tip: {
    container: 'bg-green-400/30',
    text: 'text-green-400',
  },
}

export const Note = ({ children, type = 'note' }: NoteProps) => {
  const icon = Icons[type]
  const color = ColorClasses[type]
  const title = Title[type]

  return (
    <div className={`mt-6 rounded-lg px-6 py-4 ${color.container}`}>
      <div className={`mb-2 flex items-center gap-2 ${color.text}`}>
        {icon}
        <p className="text-xl font-semibold">{title}</p>
      </div>

      {children}
    </div>
  )
}
