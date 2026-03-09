'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { SiteType } from '@/models'

import * as S from './styles'

type ProfileProps = {
  items: SiteType
}

export const Profile = ({ items }: ProfileProps) => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
      animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <S.Container>
        <motion.div
          className="mx-auto mb-2 h-[2px] w-24 rounded-full bg-gradient-cyan"
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
          <S.Title>{items.title}</S.Title>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <S.Subtitle>{items.subtitle}</S.Subtitle>
        </motion.div>
      </S.Container>
    </motion.div>
  )
}
