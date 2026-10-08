import type { PixelSpriteProps } from './PixelSprite.types'
import { SPRITE_PALETTE, SPRITES, type SpritePaletteKey } from './sprites'

type SpriteRun = {
  x: number
  y: number
  width: number
  color: string
}

const isPaletteKey = (value: string): value is SpritePaletteKey =>
  value in SPRITE_PALETTE

const toRuns = (rows: readonly string[]) => {
  const runs: SpriteRun[] = []

  rows.forEach((row, y) => {
    let x = 0

    while (x < row.length) {
      const char = row[x]

      if (!isPaletteKey(char)) {
        x++
        continue
      }

      let width = 1
      while (row[x + width] === char) {
        width++
      }

      runs.push({ x, y, width, color: SPRITE_PALETTE[char] })
      x += width
    }
  })

  return runs
}

export const PixelSprite = ({
  name,
  scale = 4,
  className,
  label,
}: PixelSpriteProps) => {
  const rows = SPRITES[name]
  const width = Math.max(...rows.map((row) => row.length))
  const height = rows.length

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width * scale}
      height={height * scale}
      shapeRendering="crispEdges"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {toRuns(rows).map((run) => (
        <rect
          key={`${run.x}-${run.y}`}
          x={run.x}
          y={run.y}
          width={run.width}
          height={1}
          fill={run.color}
        />
      ))}
    </svg>
  )
}
