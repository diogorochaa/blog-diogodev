import NextLink from 'next/link'

import { GitHubProjectCard } from '@/components/GitHubProjectCard'
import { SectionHeading } from '@/components/SectionHeading'
import type { Repo } from '@/models'

import type { PrismicSlice } from '../slice.types'
import { getTextField } from '../slice.types'

type GitHubProjectsProps = {
  slice: PrismicSlice
  repos: Repo[]
}

export const GitHubProjects = ({ slice, repos }: GitHubProjectsProps) => {
  const primary = slice.primary
  const heading = getTextField(primary, 'heading', 'Projetos em destaque')
  const emptyText = getTextField(
    primary,
    'empty_text',
    'Nenhum repositório disponível no momento.',
  )
  const githubLinkLabel = getTextField(
    primary,
    'github_link_label',
    'Visite meu GitHub',
  )
  const layout = getTextField(primary, 'layout', 'grid')

  return (
    <section className="flex flex-col gap-8">
      {heading ? <SectionHeading title={heading} /> : null}

      {repos.length > 0 ? (
        <div
          className={
            layout === 'list'
              ? 'grid grid-cols-1 gap-4'
              : 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
          }
        >
          {repos.map((repo) => (
            <GitHubProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          {emptyText}{' '}
          <NextLink
            href="https://github.com/diogorochaa"
            className="text-accent-cyan hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {githubLinkLabel}
          </NextLink>
        </p>
      )}
    </section>
  )
}

export default GitHubProjects
