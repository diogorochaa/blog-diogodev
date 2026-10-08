import { type ReactNode, Suspense } from 'react'

import { AcademicRecord } from '@/components/AcademicRecord'
import { ArticleCard } from '@/components/ArticleCard'
import { CareerTimeline } from '@/components/CareerTimeline'
import { GameSection } from '@/components/GameSection'
import { GitHubStats, GitHubStatsSkeleton } from '@/components/GitHubStats'
import { HomeHero } from '@/components/HomeHero'
import { InterestCard } from '@/components/InterestCard'
import { JsonLd } from '@/components/JsonLd'
import {
  MatchCard,
  projectToMatchCard,
  repoToMatchCard,
} from '@/components/MatchCard'
import { PlayerCard } from '@/components/PlayerCard'
import type { RetroMenuItem } from '@/components/RetroMenu'
import { SliceRenderer } from '@/components/SliceRenderer'
import { TacticsBoard } from '@/components/TacticsBoard'
import { TrophyCard } from '@/components/TrophyCard'
import { formatCareerPeriod } from '@/utils/player-identity'

import type { HomePageContentProps } from './home.types'

type HomeSection = {
  id: string
  label: string
  title: string
  description?: string
  action?: { href: string; label: string }
  content: ReactNode
}

export const HomePageContent = ({
  homeContent,
  websiteJsonLd,
  blogJsonLd,
  identity,
  profile,
  githubUsername,
  playerCard,
  currentSeason,
  featuredProjects,
  friendlyRepos,
  career,
  careerOffset,
  trophies,
  interests,
  latestPosts,
  totalPosts,
}: HomePageContentProps) => {
  const studying = profile?.currentlyStudying ?? []
  const education = profile?.education ?? []
  const tactics = profile?.tactics ?? []
  const hasProjects = featuredProjects.length > 0
  const matches = hasProjects
    ? featuredProjects.map(projectToMatchCard)
    : friendlyRepos.map(repoToMatchCard)

  const sections: Array<HomeSection | null> = [
    {
      id: 'player-card',
      label: 'Ficha técnica',
      title: 'Ficha do jogador',
      action: { href: '/about', label: 'Perfil completo' },
      content: (
        <PlayerCard
          identity={identity}
          overall={playerCard.overall}
          stats={playerCard.stats}
          statsTitle={playerCard.title}
          statsNote={playerCard.note}
        />
      ),
    },
    currentSeason || studying.length > 0 || education.length > 0
      ? {
          id: 'current-season',
          label: 'Em campo agora',
          title: 'Temporada atual',
          content: (
            <div className="grid gap-4 md:grid-cols-2">
              {currentSeason ? (
                <article className="pixel-frame flex flex-col gap-3 p-5">
                  <p className="pixel-label text-[9px] text-accent">Em campo</p>
                  <h3 className="font-display text-xl font-bold text-ink">
                    {currentSeason.role}
                    {currentSeason.company ? (
                      <span className="text-muted">
                        {' '}
                        · {currentSeason.company}
                      </span>
                    ) : null}
                  </h3>
                  <p className="pixel-label text-[9px] text-muted">
                    {formatCareerPeriod(
                      currentSeason.startDate,
                      currentSeason.endDate,
                      currentSeason.isCurrent,
                    )}
                  </p>
                  {currentSeason.technologies.length > 0 ? (
                    <ul
                      className="flex flex-wrap gap-2"
                      aria-label="Tecnologias"
                    >
                      {currentSeason.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="border-2 border-line bg-bg px-2 py-0.5 text-xs font-semibold text-ink"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ) : null}
              {studying.length > 0 ? (
                <article className="pixel-frame flex flex-col gap-3 p-5">
                  <p className="pixel-label text-[9px] text-accent">
                    Treinando
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink">
                    Estudando agora
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {studying.map((topic) => (
                      <li
                        key={topic}
                        className="flex items-center gap-3 text-ink"
                      >
                        <span aria-hidden className="h-2 w-2 bg-score" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </article>
              ) : null}
              {education.length > 0 ? (
                <article className="pixel-frame flex flex-col gap-3 p-5 md:col-span-2">
                  <p className="pixel-label text-[9px] text-accent">
                    Categorias de base
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink">
                    Formação acadêmica
                  </h3>
                  <AcademicRecord items={education} />
                </article>
              ) : null}
            </div>
          ),
        }
      : null,
    matches.length > 0
      ? {
          id: 'matches',
          label: hasProjects ? 'Jogos em destaque' : 'Amistosos',
          title: hasProjects ? 'Partidas em destaque' : 'Amistosos no GitHub',
          description: hasProjects
            ? 'Projetos contados como partidas: o problema, a estratégia e o resultado.'
            : 'Repositórios mais recentes do meu GitHub.',
          action: { href: '/projects', label: 'Todas as partidas' },
          content: (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <li key={match.href}>
                  <MatchCard {...match} />
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    {
      id: 'github',
      label: 'Estatísticas',
      title: 'Estatísticas da temporada',
      description: 'Números reais, direto da API do GitHub.',
      content: (
        <Suspense fallback={<GitHubStatsSkeleton />}>
          <GitHubStats username={githubUsername} />
        </Suspense>
      ),
    },
    tactics.length > 0
      ? {
          id: 'tactics',
          label: 'Tática',
          title: profile?.tacticsTitle || 'Quadro tático',
          description: profile?.tacticsDescription,
          content: (
            <TacticsBoard
              items={tactics}
              principles={profile?.tacticsPrinciples ?? []}
            />
          ),
        }
      : null,
    career.length > 0
      ? {
          id: 'career',
          label: 'Trajetória',
          title: 'Modo carreira',
          action: { href: '/career', label: 'Carreira completa' },
          content: (
            <CareerTimeline entries={career} stageOffset={careerOffset} />
          ),
        }
      : null,
    trophies.length > 0
      ? {
          id: 'trophies',
          label: 'Conquistas',
          title: 'Sala de troféus',
          content: (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {trophies.map((trophy) => (
                <li key={trophy.title}>
                  <TrophyCard {...trophy} />
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    interests.length > 0
      ? {
          id: 'extra',
          label: 'Extra',
          title: 'Fora de campo',
          description: 'O que me move quando não estou programando.',
          content: (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {interests.map((interest) => (
                <li key={interest.id}>
                  <InterestCard interest={interest} />
                </li>
              ))}
            </ul>
          ),
        }
      : null,
    latestPosts.length > 0
      ? {
          id: 'latest-articles',
          label: 'Novidades do blog',
          title: 'Últimos artigos',
          action: { href: '/blog', label: 'Ver todos' },
          content: (
            <ul className="flex flex-col gap-3">
              {latestPosts.map((post, index) => (
                <li key={post.slug}>
                  <ArticleCard post={post} stage={totalPosts - index} />
                </li>
              ))}
            </ul>
          ),
        }
      : null,
  ]

  const visibleSections = sections.filter(
    (section): section is HomeSection => section !== null,
  )
  const visibleIds = new Set(visibleSections.map((section) => section.id))

  const menuItems: RetroMenuItem[] = [
    { label: 'Começar', hint: 'Ficha do jogador', href: '#player-card' },
    { label: 'Jogador', hint: 'Perfil e tecnologias', href: '/about' },
    { label: 'Carreira', hint: 'Temporadas', href: '/career' },
    { label: 'Partidas', hint: 'Projetos', href: '/projects' },
    visibleIds.has('tactics')
      ? { label: 'Tática', hint: 'Arquitetura', href: '#tactics' }
      : null,
    visibleIds.has('trophies')
      ? { label: 'Troféus', hint: 'Conquistas', href: '#trophies' }
      : null,
    { label: 'Blog', hint: 'Artigos técnicos', href: '/blog' },
    visibleIds.has('extra')
      ? { label: 'Extra', hint: 'Fora de campo', href: '#extra' }
      : null,
  ].filter((item): item is RetroMenuItem => item !== null)

  return (
    <main className="flex flex-col gap-16 sm:gap-24">
      <JsonLd data={[websiteJsonLd, blogJsonLd]} />

      <HomeHero
        identity={identity}
        badge={homeContent.heroBadge}
        title={homeContent.title}
        subtitle={homeContent.subtitle}
        menuItems={menuItems}
      />

      {visibleSections.map((section, index) => (
        <GameSection
          key={section.id}
          id={section.id}
          index={String(index + 1).padStart(2, '0')}
          label={section.label}
          title={section.title}
          description={section.description}
          action={section.action}
        >
          {section.content}
        </GameSection>
      ))}

      {homeContent.slices.length > 0 ? (
        <SliceRenderer slices={homeContent.slices} />
      ) : null}
    </main>
  )
}
