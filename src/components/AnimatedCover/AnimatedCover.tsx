'use client'

import { motion, useReducedMotion } from 'framer-motion'

type AnimatedCoverProps = {
  className?: string
  compact?: boolean
}

export const AnimatedCover = ({
  className = '',
  compact = false,
}: AnimatedCoverProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-accent-purple/30 bg-gradient-to-br from-secondary/90 via-secondary/80 to-primary ${className}`}
    >
      <motion.div
        className="absolute -left-10 -top-8 h-28 w-28 rounded-full bg-accent-cyan/20 blur-2xl"
        animate={
          prefersReducedMotion ? undefined : { y: [0, -9, 0], x: [0, 2, 0] }
        }
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute -right-6 top-10 h-24 w-24 rounded-full bg-accent-purple/25 blur-2xl"
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.6, 1, 0.7], y: [0, -5, 0] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-0 left-1/3 h-20 w-20 rounded-full bg-accent-blue/25 blur-2xl"
        animate={
          prefersReducedMotion ? undefined : { y: [0, -7, 0], x: [0, -2, 0] }
        }
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute inset-0 bg-[linear-gradient(110deg,transparent_25%,rgba(139,92,246,0.15)_50%,transparent_75%)]"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['100% 0', '-100% 0'] }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 100%' }}
      />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <motion.div
          className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan"
          initial={
            prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92 }
          }
          animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {compact ? 'Post' : 'Conteudo'}
        </motion.div>
      </div>
    </div>
  )
}
