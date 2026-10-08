import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GameSection } from '@/components/GameSection'
import {
  MatchCard,
  projectToMatchCard,
  repoToMatchCard,
} from '@/components/MatchCard'
import { PixelButton } from '@/components/PixelButton'
import { RetroEmptyState } from '@/components/RetroEmptyState'

import { PROJECTS_DESCRIPTION } from './projects.constants'
import type { ProjectsPageContentProps } from './projects.types'

export const ProjectsPageContent = ({
  projects,
  repos,
  githubUrl,
}: ProjectsPageContentProps) => {
  return (
    <main className="screen-enter flex flex-col gap-16">
      <div className="flex flex-col gap-6">
        <Breadcrumbs
          items={[{ label: 'Início', href: '/' }, { label: 'Projetos' }]}
        />
        <GameSection
          id="matches"
          label="Jogos oficiais"
          title="Partidas"
          description={PROJECTS_DESCRIPTION}
          headingLevel="h1"
        >
          {projects.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <li key={project.uid}>
                  <MatchCard
                    {...projectToMatchCard(project)}
                    headingLevel="h2"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <RetroEmptyState
              sprite="goal"
              title="Nenhuma partida documentada ainda"
              description="Os estudos de caso dos projetos aparecem aqui assim que forem publicados. Enquanto isso, os amistosos do GitHub estão logo abaixo."
            />
          )}
        </GameSection>
      </div>

      {repos.length > 0 ? (
        <GameSection
          id="friendlies"
          label="Amistosos"
          title="Amistosos no GitHub"
          description="Repositórios atualizados recentemente."
        >
          <div className="flex flex-col gap-6">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {repos.map((repo) => (
                <li key={repo.id}>
                  <MatchCard {...repoToMatchCard(repo)} />
                </li>
              ))}
            </ul>
            <PixelButton
              href={githubUrl}
              external
              variant="secondary"
              className="self-start"
            >
              Todos os repositórios
            </PixelButton>
          </div>
        </GameSection>
      ) : null}
    </main>
  )
}
