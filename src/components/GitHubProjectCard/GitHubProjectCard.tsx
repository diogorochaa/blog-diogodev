import type { GitHubProjectCardProps } from './GitHubProjectCard.types'

export const GitHubProjectCard = ({ repo }: GitHubProjectCardProps) => {
  return (
    <a
      className="pixel-frame-interactive group flex flex-col gap-4 border-2 border-line bg-surface p-5"
      href={repo.html_url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex items-center gap-3">
        <span className="pixel-label flex h-10 w-10 shrink-0 items-center justify-center border-2 border-accent text-[9px] text-accent">
          GH
        </span>
        <h3 className="truncate font-display text-lg font-bold text-ink transition-colors group-hover:text-accent">
          {repo.name}
        </h3>
      </div>

      <p className="line-clamp-2 grow text-sm text-muted">
        {repo.description || 'Sem descrição disponível'}
      </p>

      <div className="flex items-center justify-between border-t-2 border-line pt-4 text-sm text-muted">
        {repo.language ? (
          <span className="flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 bg-accent" />
            {repo.language}
          </span>
        ) : (
          <span />
        )}

        <span className="flex items-center gap-4">
          <span>{repo.stargazers_count} stars</span>
          <span>{repo.forks_count} forks</span>
        </span>
      </div>
      <span className="sr-only">(abre em nova aba)</span>
    </a>
  )
}
