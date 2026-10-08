import type { PlayerStatProps } from './PlayerStat.types'

const SEGMENT_GAPS =
  'repeating-linear-gradient(90deg, transparent 0 calc(10% - 2px), var(--color-surface) calc(10% - 2px) 10%)'

export const PlayerStat = ({
  label,
  valueLabel,
  percent,
  index = 0,
}: PlayerStatProps) => {
  const width = Math.min(100, Math.max(0, percent))

  return (
    <div className="flex flex-col gap-2">
      <dt className="flex items-baseline justify-between gap-3">
        <span className="pixel-label text-[9px] text-muted sm:text-[10px]">
          {label}
        </span>
      </dt>
      <dd className="flex items-center gap-3">
        <span className="relative h-3 flex-1 bg-line" aria-hidden>
          <span
            className="stat-fill absolute inset-y-0 left-0 bg-accent"
            style={{ width: `${width}%`, animationDelay: `${index * 80}ms` }}
          />
          <span
            className="absolute inset-0"
            style={{ backgroundImage: SEGMENT_GAPS }}
          />
        </span>
        <span className="w-16 shrink-0 text-right font-pixel text-[11px] text-ink">
          {valueLabel}
        </span>
      </dd>
    </div>
  )
}
