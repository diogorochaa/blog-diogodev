import Image from 'next/image'

import { PixelSprite } from '@/components/PixelSprite'
import { PlayerStat } from '@/components/PlayerStat'

import type { PlayerCardProps } from './PlayerCard.types'

export const PlayerCard = ({
  identity,
  overall,
  stats,
  statsTitle,
  statsNote,
}: PlayerCardProps) => {
  const profileFacts = [
    { label: 'Posição', value: identity.position },
    { label: 'Estilo', value: identity.playStyle },
    { label: 'Formação', value: identity.formation },
  ].filter((fact) => fact.value)

  return (
    <article
      aria-label={`Ficha de ${identity.name}`}
      className="pixel-frame scanlines grid overflow-hidden md:grid-cols-[17rem_minmax(0,1fr)]"
    >
      <div className="flex flex-col items-center gap-5 border-b-2 border-line bg-surface-2 p-6 text-center md:border-r-2 md:border-b-0">
        <div className="flex w-full items-start justify-between">
          {overall !== null ? (
            <p className="flex flex-col items-start">
              <span className="score-pop font-pixel text-3xl text-score">
                {overall}
              </span>
              <span className="pixel-label text-[9px] text-muted">
                <abbr title="Geral" className="no-underline">
                  GER
                </abbr>
                <span className="sr-only"> (ilustrativo)</span>
              </span>
            </p>
          ) : (
            <span />
          )}

          {identity.shirtNumber !== null ? (
            <p className="relative flex items-center justify-center">
              <span className="sr-only">Camisa {identity.shirtNumber}</span>
              <PixelSprite name="shirt" scale={6} />
              <span
                aria-hidden
                className="absolute top-4 font-pixel text-sm text-bg"
              >
                {identity.shirtNumber}
              </span>
            </p>
          ) : null}
        </div>

        {identity.avatarUrl ? (
          <Image
            src={identity.avatarUrl}
            alt={identity.avatarAlt}
            width={144}
            height={144}
            className="h-36 w-36 border-4 border-ink object-cover shadow-pixel-accent"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-36 w-36 items-center justify-center border-4 border-ink bg-bg"
          >
            <PixelSprite name="ball" scale={8} />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="font-display text-xl font-bold text-ink">
            {identity.name}
          </p>
          {identity.role ? (
            <p className="pixel-label text-accent">{identity.role}</p>
          ) : null}
          {identity.location ? (
            <p className="text-sm text-muted">{identity.location}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col gap-6 p-6">
        {profileFacts.length > 0 ? (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {profileFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-2 border-2 border-line bg-bg p-3"
              >
                <dt className="pixel-label text-[9px] text-muted">
                  {fact.label}
                </dt>
                <dd className="font-semibold text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {stats.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h3 className="pixel-label text-ink">{statsTitle}</h3>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-2">
              {stats.map((stat, index) => (
                <PlayerStat key={stat.label} {...stat} index={index} />
              ))}
            </dl>
            {statsNote ? (
              <p className="text-xs leading-relaxed text-muted">{statsNote}</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}
