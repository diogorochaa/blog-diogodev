import * as prismic from '@prismicio/client'

import { AboutExperience } from '@/components/AboutExperience'
import { AcademicRecord } from '@/components/AcademicRecord'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CompactRichText } from '@/components/CompactRichText'
import { GameSection } from '@/components/GameSection'
import { JsonLd } from '@/components/JsonLd'
import { MatchCard, repoToMatchCard } from '@/components/MatchCard'
import { PixelButton } from '@/components/PixelButton'
import { PlayerCard } from '@/components/PlayerCard'
import { RetroBadge } from '@/components/RetroBadge'
import { ScoreBoard } from '@/components/ScoreBoard'
import { SliceRenderer } from '@/components/SliceRenderer'
import { buildPlayerCardStats } from '@/lib/player'
import { getExperienceYears } from '@/utils/player-identity'

import type { AboutPageContentProps } from './about.types'

export const AboutPageContent = ({
  aboutContent,
  personJsonLd,
  profile,
  github,
  identity,
  repos,
  githubUrl,
}: AboutPageContentProps) => {
  const introParagraphs = aboutContent.intro
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
  const hasProfileBio = profile ? prismic.isFilled.richText(profile.bio) : false
  const hasGoals = profile ? prismic.isFilled.richText(profile.goals) : false
  const studying = profile?.currentlyStudying ?? []
  const education = profile?.education ?? []
  const playerCard = buildPlayerCardStats(profile, aboutContent.experiences)
  const experienceYears = getExperienceYears(aboutContent.experiences)

  return (
    <main className="screen-enter flex flex-col gap-16 sm:gap-20">
      <JsonLd data={personJsonLd} />

      <div className="flex flex-col gap-6">
        <Breadcrumbs
          items={[{ label: 'Início', href: '/' }, { label: 'Perfil' }]}
        />
        <header className="flex flex-col gap-3">
          <RetroBadge variant="accent" className="self-start">
            Ficha do jogador
          </RetroBadge>
          <h1 className="on-pitch font-display text-4xl font-extrabold text-ink sm:text-5xl">
            {aboutContent.title}
          </h1>
        </header>
        <PlayerCard
          identity={identity}
          overall={playerCard.overall}
          stats={playerCard.stats}
          statsTitle={playerCard.title}
          statsNote={playerCard.note}
        />
      </div>

      <GameSection id="bio" label="Biografia" title={aboutContent.greeting}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <div className="pixel-frame flex max-w-[72ch] flex-col gap-4 p-6">
            {hasProfileBio && profile ? (
              <CompactRichText
                field={profile.bio}
                className="text-lg leading-relaxed text-ink/85"
              />
            ) : (
              introParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed text-ink/85"
                >
                  {paragraph}
                </p>
              ))
            )}
          </div>
          <ScoreBoard
            className="lg:grid-cols-1"
            items={[
              { label: aboutContent.reposLabel, value: github.public_repos },
              { label: aboutContent.followersLabel, value: github.followers },
              ...(experienceYears > 0
                ? [{ label: 'Anos em campo', value: experienceYears }]
                : []),
            ]}
          />
        </div>
      </GameSection>

      {education.length > 0 || studying.length > 0 || hasGoals ? (
        <GameSection
          id="training"
          label="Centro de treinamento"
          title={
            education.length > 0 ? 'Formação e treino' : 'Treino e objetivos'
          }
        >
          <div className="grid gap-6 md:grid-cols-2">
            {education.length > 0 ? (
              <div className="pixel-frame flex flex-col gap-4 p-5 md:col-span-2">
                <h3 className="pixel-label text-ink">Formação acadêmica</h3>
                <AcademicRecord items={education} />
              </div>
            ) : null}
            {studying.length > 0 ? (
              <div className="pixel-frame flex flex-col gap-4 p-5">
                <h3 className="pixel-label text-ink">Treinando agora</h3>
                <ul className="flex flex-wrap gap-2">
                  {studying.map((topic) => (
                    <li key={topic}>
                      <RetroBadge variant="pitch">{topic}</RetroBadge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {hasGoals && profile ? (
              <div className="pixel-frame flex flex-col gap-4 p-5">
                <h3 className="pixel-label text-ink">Objetivos da temporada</h3>
                <CompactRichText field={profile.goals} />
              </div>
            ) : null}
          </div>
        </GameSection>
      ) : null}

      {aboutContent.experiences.length > 0 ? (
        <AboutExperience
          heading={aboutContent.experienceHeading}
          description={aboutContent.experienceDescription}
          items={aboutContent.experiences}
        />
      ) : null}

      <GameSection
        id="friendlies"
        label="Amistosos"
        title={aboutContent.projectsHeading}
      >
        {repos.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <li key={repo.id}>
                <MatchCard {...repoToMatchCard(repo)} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            {aboutContent.emptyProjectsText}{' '}
            <a
              href={githubUrl}
              className="font-semibold text-accent-soft underline decoration-2 underline-offset-4 hover:text-accent"
              rel="noopener noreferrer"
              target="_blank"
            >
              {aboutContent.githubLinkLabel}
            </a>
          </p>
        )}
      </GameSection>

      {identity.links.length > 0 ? (
        <GameSection
          id="contact"
          label="Janela de transferências"
          title="Contato"
        >
          <ul className="flex flex-wrap gap-3">
            {identity.links.map((link) => (
              <li key={link.kind}>
                <PixelButton
                  href={link.href}
                  external={link.href.startsWith('http')}
                  variant="secondary"
                >
                  {link.label}
                </PixelButton>
              </li>
            ))}
          </ul>
        </GameSection>
      ) : null}

      {aboutContent.slices.length > 0 ? (
        <SliceRenderer
          slices={aboutContent.slices}
          profile={github}
          repos={repos}
        />
      ) : null}
    </main>
  )
}
