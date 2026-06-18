import type { GitHubProjectCardProps } from './GitHubProjectCard.types'

export const GitHubProjectCard = ({ repo }: GitHubProjectCardProps) => {
  return (
    <a
      className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-accent-purple/20 bg-linear-to-br from-secondary/80 to-secondary/60 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-accent-cyan/55 hover:shadow-glow-cyan"
      href={repo.html_url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-cyan/10 text-sm font-bold text-accent-cyan transition-transform duration-300 group-hover:scale-110">
          GH
        </div>
        <h3 className="truncate text-xl font-bold text-white transition-colors duration-300 group-hover:text-accent-cyan">
          {repo.name}
        </h3>
      </div>

      <p className="line-clamp-2 grow text-sm text-gray-400">
        {repo.description || 'Sem descrição disponível'}
      </p>

      <div className="flex items-center justify-between border-t border-accent-purple/20 pt-4">
        {repo.language ? (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="h-3 w-3 rounded-full bg-accent-cyan" />
            {repo.language}
          </div>
        ) : null}

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>{repo.stargazers_count} stars</span>
          <span>{repo.forks_count} forks</span>
        </div>
      </div>
    </a>
  )
}
