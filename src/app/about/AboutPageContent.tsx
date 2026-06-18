import Image from 'next/image'
import NextLink from 'next/link'

import { AboutExperience } from '@/components/AboutExperience'
import { GitHubProjectCard } from '@/components/GitHubProjectCard'
import { JsonLd } from '@/components/JsonLd'
import { SliceRenderer } from '@/components/SliceRenderer'

import type { AboutPageContentProps } from './about.types'

export const AboutPageContent = ({
  aboutContent,
  personJsonLd,
  avatarUrl,
  publicRepos,
  followers,
  repos,
}: AboutPageContentProps) => {
  const introParagraphs = aboutContent.intro
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
      <JsonLd data={personJsonLd} />

      <div className="mb-5 flex flex-col items-center gap-3 text-center sm:mb-8 sm:gap-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={aboutContent.avatarAlt}
            width={112}
            height={112}
            className="h-28 w-28 rounded-full border-2 border-accent-cyan/40 object-cover"
          />
        ) : (
          <div className="text-6xl md:text-7xl">👨‍💻</div>
        )}
        <h1 className="bg-linear-to-r from-accent-purple via-accent-cyan to-accent-pink bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
          {aboutContent.title}
        </h1>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-accent-purple/20 bg-linear-to-br from-secondary/50 to-secondary/30 p-5 backdrop-blur-sm sm:gap-6 sm:p-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          {aboutContent.greeting}
        </h2>

        <div className="space-y-2 text-base leading-relaxed text-gray-300 sm:text-lg md:text-xl">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
            <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
              {publicRepos}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
              {aboutContent.reposLabel}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 rounded-xl border border-accent-purple/30 bg-linear-to-br from-accent-purple/20 to-accent-blue/20 p-6 transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55">
            <div className="text-3xl font-bold text-accent-cyan md:text-4xl">
              {followers}
            </div>
            <div className="text-sm uppercase tracking-wider text-gray-400 md:text-base">
              {aboutContent.followersLabel}
            </div>
          </div>
        </div>
      </div>

      <AboutExperience
        heading={aboutContent.experienceHeading}
        description={aboutContent.experienceDescription}
        items={aboutContent.experiences}
      />

      <div className="flex flex-col gap-8">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          <span className="text-accent-cyan">🚀</span>{' '}
          {aboutContent.projectsHeading}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <GitHubProjectCard key={repo.id} repo={repo} />
          ))}
        </div>

        {repos.length === 0 ? (
          <p className="text-center text-gray-400">
            {aboutContent.emptyProjectsText}{' '}
            <NextLink
              href="https://github.com/diogorochaa"
              className="text-accent-cyan hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {aboutContent.githubLinkLabel}
            </NextLink>
          </p>
        ) : null}
      </div>

      {aboutContent.slices.length > 0 ? (
        <SliceRenderer
          slices={aboutContent.slices}
          profile={{
            avatar_url: avatarUrl,
            name: aboutContent.title,
            company: null,
            location: null,
            bio: null,
            public_repos: publicRepos,
            followers,
          }}
          repos={repos}
        />
      ) : null}
    </div>
  )
}
