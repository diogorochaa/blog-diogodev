export const coverVariants = ['aurora', 'solar', 'neon', 'ember'] as const

export type CoverVariant = (typeof coverVariants)[number]

export const getCoverVariant = (seed: string): CoverVariant => {
  let hash = 0

  for (const char of seed) {
    hash = (hash + char.charCodeAt(0)) % coverVariants.length
  }

  return coverVariants[hash] ?? 'aurora'
}
