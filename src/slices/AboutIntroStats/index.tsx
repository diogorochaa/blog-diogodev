import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import Image from 'next/image'

import type { GithubProfile } from '@/models'

import type { PrismicSlice } from '../slice.types'
import { getBooleanField, getRichTextField, getTextField } from '../slice.types'

type AboutIntroStatsProps = {
  slice: PrismicSlice
  profile?: GithubProfile
}

export const AboutIntroStats = ({ slice, profile }: AboutIntroStatsProps) => {
  const primary = slice.primary
  const title = getTextField(primary, 'title', profile?.name ?? 'Sobre mim')
  const greeting = getTextField(primary, 'greeting')
  const intro = getRichTextField(primary, 'intro')
  const avatarAlt = getTextField(primary, 'avatar_alt', title)
  const showGithubStats = getBooleanField(primary, 'show_github_stats', true)
  const reposLabel = getTextField(primary, 'repos_label', 'Repositórios')
  const followersLabel = getTextField(primary, 'followers_label', 'Seguidores')

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 text-center sm:gap-4">
        {profile?.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={avatarAlt}
            width={112}
            height={112}
            className="h-28 w-28 border-2 border-line-strong object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center border-2 border-accent bg-surface font-pixel text-xl text-accent">
            {title.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>

      <div className="flex flex-col gap-5 pixel-frame p-5 sm:gap-6 sm:p-8">
        {greeting ? (
          <h3 className="text-2xl font-bold text-ink sm:text-3xl md:text-4xl">
            {greeting}
          </h3>
        ) : null}

        {prismic.asText(intro) ? (
          <div className="space-y-2 text-base leading-relaxed text-ink/85 sm:text-lg md:text-xl">
            <PrismicRichText field={intro} />
          </div>
        ) : null}

        {showGithubStats ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col items-center gap-2 border-2 border-line bg-bg p-6">
              <div className="font-pixel text-2xl text-score">
                {profile?.public_repos ?? 0}
              </div>
              <div className="pixel-label text-[9px] text-muted">
                {reposLabel}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 border-2 border-line bg-bg p-6">
              <div className="font-pixel text-2xl text-score">
                {profile?.followers ?? 0}
              </div>
              <div className="pixel-label text-[9px] text-muted">
                {followersLabel}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default AboutIntroStats
