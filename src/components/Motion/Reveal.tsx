'use client'

import { motion, useReducedMotion } from 'framer-motion'

import type { RevealProps } from './Reveal.types'

export const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 0.55,
  y = 18,
  once = true,
}: RevealProps) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
