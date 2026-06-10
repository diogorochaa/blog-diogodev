'use client'

import { motion, useReducedMotion } from 'framer-motion'

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
  const prefersReducedMotion = useReducedMotion()
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

      <motion.div
        className={`absolute -left-10 -top-8 h-28 w-28 rounded-full blur-2xl ${palette.orbA}`}
        animate={
          prefersReducedMotion ? undefined : { y: [0, -9, 0], x: [0, 2, 0] }
        }
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className={`absolute -right-6 top-10 h-24 w-24 rounded-full blur-2xl ${palette.orbB}`}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.6, 1, 0.7], y: [0, -5, 0] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className={`absolute bottom-0 left-1/3 h-20 w-20 rounded-full blur-2xl ${palette.orbC}`}
        animate={
          prefersReducedMotion ? undefined : { y: [0, -7, 0], x: [0, -2, 0] }
        }
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['100% 0', '-100% 0'] }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage: `linear-gradient(110deg, transparent 25%, ${palette.shimmer} 50%, transparent 75%)`,
          backgroundSize: '200% 100%',
        }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <motion.div
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${palette.badge}`}
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92 }
          }
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {compact ? 'Artigo' : 'Conteúdo'}
        </motion.div>
      </div>
    </div>
  )
}
