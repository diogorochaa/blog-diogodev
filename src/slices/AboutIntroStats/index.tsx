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
            className="h-28 w-28 rounded-full border-2 border-accent-cyan/40 object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-accent-cyan/30 bg-accent-cyan/10 text-3xl font-bold text-accent-cyan">
            {title.charAt(0).toUpperCase()}
          </div>
        )}

        <h2 className="bg-linear-to-r from-accent-purple via-accent-cyan to-accent-pink bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-accent-purple/20 bg-linear-to-br from-secondary/50 to-secondary/30 p-5 backdrop-blur-sm sm:gap-6 sm:p-8">
        {greeting ? (
          <h3 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {greeting}
          </h3>
        ) : null}

        {prismic.asText(intro) ? (
          <div className="space-y-2 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
            <PrismicRichText field={intro} />
          </div>
        ) : null}

        {showGithubStats ? (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
              <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
                {profile?.public_repos ?? 0}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
                {reposLabel}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
              <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
                {profile?.followers ?? 0}
              </div>
              <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
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
