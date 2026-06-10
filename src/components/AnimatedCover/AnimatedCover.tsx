import type { AnimatedCoverProps } from './AnimatedCover.types'

const variantStyles = {
  aurora: {
    orbA: 'bg-accent-cyan/30',
    orbB: 'bg-accent-purple/35',
    orbC: 'bg-accent-blue/30',
    shimmer: 'rgba(34, 211, 238, 0.18)',
    badge: 'border-accent-cyan/50 text-accent-cyan bg-accent-cyan/10',
    grid: 'rgba(34, 211, 238, 0.08)',
  },
  solar: {
    orbA: 'bg-accent-orange/35',
    orbB: 'bg-accent-pink/30',
    orbC: 'bg-accent-purple/25',
    shimmer: 'rgba(251, 146, 60, 0.2)',
    badge: 'border-accent-orange/50 text-accent-orange bg-accent-orange/10',
    grid: 'rgba(251, 146, 60, 0.08)',
  },
  neon: {
    orbA: 'bg-accent-lime/30',
    orbB: 'bg-accent-cyan/30',
    orbC: 'bg-accent-blue/35',
    shimmer: 'rgba(163, 230, 53, 0.18)',
    badge: 'border-accent-lime/50 text-accent-lime bg-accent-lime/10',
    grid: 'rgba(163, 230, 53, 0.08)',
  },
  ember: {
    orbA: 'bg-accent-pink/35',
    orbB: 'bg-accent-purple/30',
    orbC: 'bg-accent-blue/25',
    shimmer: 'rgba(236, 72, 153, 0.2)',
    badge: 'border-accent-pink/50 text-accent-pink bg-accent-pink/10',
    grid: 'rgba(236, 72, 153, 0.08)',
  },
} as const

export const AnimatedCover = ({
  className = '',
  compact = false,
  variant,
}: AnimatedCoverProps) => {
  const palette = variantStyles[variant ?? 'aurora']

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-surface-elevated via-secondary to-primary ${className}`}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `linear-gradient(${palette.grid} 1px, transparent 1px), linear-gradient(90deg, ${palette.grid} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <div
        className={`cover-orb-a absolute -left-10 -top-8 h-28 w-28 rounded-full blur-2xl ${palette.orbA}`}
      />

      <div
        className={`cover-orb-b absolute -right-6 top-10 h-24 w-24 rounded-full blur-2xl ${palette.orbB}`}
      />

      <div
        className={`cover-orb-c absolute bottom-0 left-1/3 h-20 w-20 rounded-full blur-2xl ${palette.orbC}`}
      />

      <div
        className="cover-shimmer absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(110deg, transparent 25%, ${palette.shimmer} 50%, transparent 75%)`,
          backgroundSize: '200% 100%',
        }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          className={`cover-badge-in rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${palette.badge}`}
        >
          {compact ? 'Artigo' : 'Conteúdo'}
        </div>
      </div>
    </div>
  )
}
