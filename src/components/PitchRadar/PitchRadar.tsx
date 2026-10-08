import type { PitchRadarProps } from './PitchRadar.types'

type Dot = { x: number; y: number }

const GOALKEEPER: Dot = { x: 6, y: 50 }
const FIRST_LINE_X = 16
const LAST_LINE_X = 44

/** Parses "4-3-3" into outfield lines; anything else yields no lines. */
const parseFormation = (formation: string) => {
  const lines = formation
    .split(/\D+/)
    .filter(Boolean)
    .map(Number)
    .filter((count) => count > 0 && count <= 6)

  const players = lines.reduce((total, count) => total + count, 0)

  return players > 0 && players <= 10 ? lines : []
}

const buildDots = (lines: number[]): Dot[] => {
  if (lines.length === 0) {
    return []
  }

  const step =
    lines.length > 1 ? (LAST_LINE_X - FIRST_LINE_X) / (lines.length - 1) : 0

  return [
    GOALKEEPER,
    ...lines.flatMap((count, lineIndex) =>
      Array.from({ length: count }, (_, playerIndex) => ({
        x: FIRST_LINE_X + step * lineIndex,
        y: ((playerIndex + 1) / (count + 1)) * 100,
      })),
    ),
  ]
}

export const PitchRadar = ({ formation, className = '' }: PitchRadarProps) => {
  const dots = buildDots(parseFormation(formation))

  return (
    <div
      aria-hidden
      className={['hud-glass relative h-20 w-32 shrink-0', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="absolute inset-y-0 left-1/2 w-px bg-pitch-line/70" />
      <span className="absolute top-1/2 left-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pitch-line/70" />
      <span className="absolute top-1/2 left-0 h-9 w-4 -translate-y-1/2 border border-l-0 border-pitch-line/70" />
      <span className="absolute top-1/2 right-0 h-9 w-4 -translate-y-1/2 border border-r-0 border-pitch-line/70" />

      {dots.map((dot) => (
        <span
          key={`${dot.x}-${dot.y}`}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-team-home"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        />
      ))}
      <span className="absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-blink bg-score" />
    </div>
  )
}
