'use client'

import { motion, useReducedMotion } from 'framer-motion'

import type { ProfileProps } from './Profile.types'

export const Profile = ({ items }: ProfileProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <motion.div
          className="mx-auto mb-2 h-0.5 w-24 rounded-full bg-gradient-cyan"
          initial={prefersReducedMotion ? undefined : { scaleX: 0, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.16, ease: 'easeOut' }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.div
          initial={
            prefersReducedMotion
              ? undefined
              : { opacity: 0, y: 18, filter: 'blur(6px)', scale: 0.98 }
          }
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }
          }
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl font-bold leading-tight text-transparent bg-clip-text bg-linear-to-r from-accent-purple via-accent-cyan to-accent-pink md:text-5xl lg:text-6xl">
            {items.title}
          </h1>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            {items.subtitle}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
