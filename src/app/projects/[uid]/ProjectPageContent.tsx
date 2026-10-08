import * as prismic from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

import {
  type BreadcrumbItem,
  Breadcrumbs,
  buildBreadcrumbJsonLd,
} from '@/components/Breadcrumbs'
import { CompactRichText } from '@/components/CompactRichText'
import { JsonLd } from '@/components/JsonLd'
import { PROJECT_STATUS_LABELS } from '@/components/MatchCard'
import { PixelButton } from '@/components/PixelButton'
import { RetroBadge } from '@/components/RetroBadge'

import type { ProjectPageContentProps } from './project.types'

const REPORT_SECTIONS = [
  { key: 'problem', label: 'Pré-jogo', title: 'O problema' },
  { key: 'solution', label: 'Estratégia', title: 'A solução' },
  { key: 'architecture', label: 'Esquema tático', title: 'Arquitetura' },
  {
    key: 'technicalDecisions',
    label: 'Decisões do técnico',
    title: 'Decisões técnicas',
  },
  {
    key: 'technicalChallenges',
    label: 'Lances difíceis',
    title: 'Desafios técnicos',
  },
  { key: 'learnings', label: 'Pós-jogo', title: 'Aprendizados' },
] as const

export const ProjectPageContent = ({
  project,
  projectJsonLd,
}: ProjectPageContentProps) => {
  const status = PROJECT_STATUS_LABELS[project.status]
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Início', href: '/' },
    { label: 'Projetos', href: '/projects' },
    { label: project.title },
  ]
  const sections = REPORT_SECTIONS.filter((section) =>
    prismic.isFilled.richText(project[section.key]),
  )

  return (
    <main className="screen-enter flex flex-col gap-10">
      <JsonLd
        data={[
          projectJsonLd,
          buildBreadcrumbJsonLd(breadcrumbs, `/projects/${project.uid}`),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="pixel-frame scanlines overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-line px-5 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <RetroBadge variant="accent">Relatório da partida</RetroBadge>
            <RetroBadge variant={status.tone === 'live' ? 'solid' : 'default'}>
              {status.label}
            </RetroBadge>
          </div>
          {project.category ? (
            <span className="pixel-label text-[9px] text-muted">
              {project.category}
            </span>
          ) : null}
        </div>

        <div
          aria-hidden
          className="pitch-surface flex items-center justify-center gap-4 border-b-2 border-line-strong px-5 py-6 sm:gap-8"
        >
          <span className="pixel-label on-pitch text-xs text-ink sm:text-sm">
            Diogo FC
          </span>
          <span className="on-pitch font-pixel text-base text-accent">X</span>
          <span className="pixel-label on-pitch truncate text-xs text-score sm:text-sm">
            {project.title}
          </span>
        </div>

        <div className="flex flex-col gap-5 p-5 sm:p-8">
          <h1 className="font-display text-3xl font-extrabold text-ink sm:text-5xl">
            {project.title}
          </h1>
          {project.shortDescription ? (
            <p className="max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              {project.shortDescription}
            </p>
          ) : null}
          {project.githubUrl || project.demoUrl ? (
            <div className="flex flex-wrap gap-3">
              {project.demoUrl ? (
                <PixelButton href={project.demoUrl} external>
                  Assistir partida (demo)
                  <span className="sr-only"> (abre em nova aba)</span>
                </PixelButton>
              ) : null}
              {project.githubUrl ? (
                <PixelButton
                  href={project.githubUrl}
                  external
                  variant="secondary"
                >
                  Código no GitHub
                  <span className="sr-only"> (abre em nova aba)</span>
                </PixelButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      {prismic.isFilled.image(project.coverImage) ? (
        <PrismicNextImage
          field={project.coverImage}
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="pixel-frame h-auto w-full"
          fallbackAlt=""
        />
      ) : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <div className="pixel-frame flex min-w-0 flex-col gap-10 p-6 sm:p-8">
          {prismic.isFilled.richText(project.description) ? (
            <CompactRichText
              field={project.description}
              className="text-lg text-ink/90"
            />
          ) : null}

          {sections.map((section) => (
            <section
              key={section.key}
              aria-labelledby={`${section.key}-title`}
              className="flex flex-col gap-4"
            >
              <p className="pixel-label text-[9px] text-accent">
                {section.label}
              </p>
              <h2
                id={`${section.key}-title`}
                className="font-display text-2xl font-bold text-ink"
              >
                {section.title}
              </h2>
              <CompactRichText
                field={project[section.key]}
                className="text-base text-ink/85 sm:text-lg"
              />
            </section>
          ))}
        </div>

        {project.technologies.length > 0 ? (
          <aside
            aria-labelledby="lineup-title"
            className="pixel-frame flex flex-col gap-4 p-5 lg:sticky lg:top-28"
          >
            <h2 id="lineup-title" className="pixel-label text-ink">
              Escalação
            </h2>
            <ol className="flex flex-col gap-2">
              {project.technologies.map((technology, index) => (
                <li
                  key={technology}
                  className="flex items-center gap-3 border-b-2 border-line pb-2 last:border-b-0"
                >
                  <span className="font-pixel text-[10px] text-score">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-ink">{technology}</span>
                </li>
              ))}
            </ol>
          </aside>
        ) : null}
      </div>

      {project.gallery.length > 0 ? (
        <section
          aria-labelledby="replays-title"
          className="flex flex-col gap-4"
        >
          <h2 id="replays-title" className="pixel-label on-pitch text-ink">
            Melhores momentos
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((item, index) => (
              <li key={item.image.url ?? index}>
                <figure className="pixel-frame overflow-hidden">
                  <PrismicNextImage
                    field={item.image}
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full"
                    fallbackAlt=""
                  />
                  {item.caption ? (
                    <figcaption className="border-t-2 border-line px-4 py-3 text-sm text-muted">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div>
        <PixelButton href="/projects" variant="secondary">
          ← Voltar às partidas
        </PixelButton>
      </div>
    </main>
  )
}
