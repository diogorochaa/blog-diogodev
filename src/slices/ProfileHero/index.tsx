import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

import type { PrismicSlice } from '../slice.types'
import { getRichTextField, getTextField } from '../slice.types'

type ProfileHeroProps = {
  slice: PrismicSlice
}

const surfaceClassNames = {
  panel: 'panel-vivid px-6 py-8 sm:px-8 sm:py-10',
  plain: 'px-2 py-4',
  gradient:
    'rounded-2xl border border-accent-purple/30 bg-linear-to-br from-secondary via-secondary/80 to-primary px-6 py-8 sm:px-8 sm:py-10',
} as const

export const ProfileHero = ({ slice }: ProfileHeroProps) => {
  const primary = slice.primary
  const badge = getTextField(primary, 'badge', 'Developer Blog')
  const title = getTextField(primary, 'title')
  const subtitle = getRichTextField(primary, 'subtitle')
  const align = getTextField(primary, 'align', 'center')
  const surface = getTextField(primary, 'surface', 'panel')
  const contentAlign =
    align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const surfaceClass =
    surfaceClassNames[surface as keyof typeof surfaceClassNames] ??
    surfaceClassNames.panel

  return (
    <section className={`relative overflow-hidden ${surfaceClass}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 211, 238, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-36 w-36 rounded-full bg-accent-cyan/15 blur-3xl" />

      <div className={`relative z-10 flex flex-col gap-4 ${contentAlign}`}>
        {badge ? (
          <span className="rounded-full border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
            {badge}
          </span>
        ) : null}

        {title ? (
          <h2 className="text-gradient-vivid max-w-3xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
            {title}
          </h2>
        ) : null}

        {prismic.asText(subtitle) ? (
          <div className="max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            <PrismicRichText field={subtitle} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default ProfileHero
