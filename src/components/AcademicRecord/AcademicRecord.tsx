import { RetroBadge } from '@/components/RetroBadge'
import type { Education } from '@/models'

import type { AcademicRecordProps } from './AcademicRecord.types'

const formatPeriod = ({ startYear, endYear, inProgress }: Education) => {
  if (inProgress) {
    return startYear ? `${startYear} – em andamento` : 'Em andamento'
  }
  if (startYear && startYear !== endYear) {
    return `${startYear} – ${endYear}`
  }
  return `Concluído em ${endYear}`
}

export const AcademicRecord = ({
  items,
  headingLevel = 'h4',
}: AcademicRecordProps) => {
  const Heading = headingLevel

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={`${item.level}-${item.course}-${item.institution}`}
          className={[
            'flex flex-col gap-2 border-2 bg-bg p-4',
            item.inProgress ? 'border-accent' : 'border-line',
          ].join(' ')}
        >
          <div className="flex flex-wrap items-center gap-2">
            <RetroBadge variant={item.inProgress ? 'solid' : 'default'}>
              {item.level}
            </RetroBadge>
            <RetroBadge variant={item.inProgress ? 'accent' : 'pitch'}>
              {item.inProgress ? 'Em andamento' : 'Concluído'}
            </RetroBadge>
          </div>
          <Heading className="font-display text-lg font-bold text-ink">
            {item.course || item.level}
          </Heading>
          {item.institution || item.location ? (
            <p className="text-muted">
              {[item.institution, item.location].filter(Boolean).join(' · ')}
            </p>
          ) : null}
          <p className="pixel-label text-[9px] text-muted">
            {formatPeriod(item)}
          </p>
        </li>
      ))}
    </ul>
  )
}
