import { PitchRadar } from '@/components/PitchRadar'
import { PixelButton } from '@/components/PixelButton'
import { PixelSprite } from '@/components/PixelSprite'
import { RetroMenu } from '@/components/RetroMenu'

import type { HomeHeroProps } from './HomeHero.types'

const HERO_LINK_KINDS = new Set(['github', 'linkedin'])

const toClubName = (name: string) =>
  `${(name.split(' ')[0] || name).toUpperCase()} FC`

/** Broadcast name plate format: "Diogo Rocha" → "D. Rocha". */
const toPlateName = (name: string) => {
  const parts = name.trim().split(/\s+/)

  if (parts.length < 2) {
    return name
  }

  return `${parts[0].charAt(0)}. ${parts[parts.length - 1]}`
}

export const HomeHero = ({
  identity,
  badge,
  title,
  subtitle,
  menuItems,
}: HomeHeroProps) => {
  const heroLinks = identity.links.filter((link) =>
    HERO_LINK_KINDS.has(link.kind),
  )
  const clubName = toClubName(identity.name)
  const plateDetail = [identity.position, identity.shirtNumber]
    .filter((value) => value !== null && value !== '')
    .join(' ')

  return (
    <section
      aria-labelledby="hero-title"
      className="screen-enter relative grid overflow-hidden border-2 border-line-strong shadow-pixel lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]"
    >
      <div className="pitch-surface relative flex flex-col gap-6 p-5 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-10 hidden w-0.5 bg-pitch-line/60 sm:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-10 hidden h-60 w-60 translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pitch-line/60 sm:block"
        />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <p className="hud-glass flex items-center gap-3 px-3 py-2">
            <PixelSprite name="crest" scale={2} />
            <span className="font-pixel text-sm text-ink">{clubName}</span>
            <span aria-hidden className="font-pixel text-lg text-score">
              0-0
            </span>
          </p>
          {badge ? (
            <p className="on-pitch flex items-center gap-2 font-pixel text-lg text-score">
              <PixelSprite name="clock" scale={2} />
              {badge}
            </p>
          ) : null}
        </div>

        <p
          aria-hidden
          className="hud-title relative font-pixel text-4xl leading-none text-accent sm:text-6xl xl:text-7xl"
        >
          {clubName}
        </p>

        <div className="hud-glass relative flex max-w-xl flex-col gap-3 p-5">
          <h1
            id="hero-title"
            className="font-display text-3xl font-extrabold text-ink sm:text-5xl"
          >
            {identity.name}
          </h1>
          {identity.role ? (
            <p className="pixel-label text-xs text-score sm:text-sm">
              {identity.role}
            </p>
          ) : null}
          {identity.specialties.length > 0 ? (
            <p className="pixel-label text-muted">
              {identity.specialties.join(' · ')}
            </p>
          ) : null}
          {title ? (
            <p className="mt-2 text-xl leading-snug font-semibold text-ink sm:text-2xl">
              {title}
            </p>
          ) : null}
          {subtitle ? (
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="relative flex flex-wrap items-center gap-3">
          <PixelButton href="#player-card">Começar carreira</PixelButton>
          <PixelButton href="/projects" variant="secondary">
            Ver partidas
          </PixelButton>
          {heroLinks.map((link) => (
            <PixelButton
              key={link.kind}
              href={link.href}
              external
              variant="secondary"
            >
              {link.label}
              <span className="sr-only"> (abre em nova aba)</span>
            </PixelButton>
          ))}
        </div>

        <div className="relative mt-auto flex items-end justify-between gap-4 pt-4">
          <p className="on-pitch flex flex-col gap-1">
            <span className="font-pixel text-lg text-muted">
              {toPlateName(identity.name)}
            </span>
            {plateDetail ? (
              <span className="font-pixel text-sm text-ink uppercase">
                {plateDetail}
              </span>
            ) : null}
          </p>
          <PitchRadar formation={identity.formation} />
        </div>
      </div>

      <div className="flex flex-col border-t-2 border-line-strong bg-bg lg:border-t-0 lg:border-l-2">
        <div className="flex items-center justify-between border-b-2 border-line px-5 py-4">
          <p className="pixel-label text-ink">Menu principal</p>
          <p className="pixel-label text-[9px] text-score">
            <span className="animate-blink">Aperte start</span>
          </p>
        </div>
        <RetroMenu
          items={menuItems}
          ariaLabel="Menu principal do portfólio"
          className="p-3 sm:p-4"
        />
        <div
          aria-hidden
          className="pitch-surface mt-auto flex h-12 items-center justify-between border-t-2 border-line-strong px-5"
        >
          <PixelSprite name="goal" scale={3} />
          <PixelSprite name="ball" scale={2} />
          <PixelSprite name="goal" scale={3} />
        </div>
      </div>
    </section>
  )
}
