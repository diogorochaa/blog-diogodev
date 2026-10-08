import { PixelButton } from '@/components/PixelButton'
import { PixelSprite } from '@/components/PixelSprite'
import { PlayerStat } from '@/components/PlayerStat'
import { ScoreBoard } from '@/components/ScoreBoard'
import { GithubService } from '@/services'

import type {
  GitHubStatsProps,
  GitHubStatsViewProps,
} from './GitHubStats.types'

const GitHubStatsView = ({ stats, profileUrl }: GitHubStatsViewProps) => {
  if (!stats.isAvailable) {
    return (
      <div className="pixel-frame flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <PixelSprite name="terminal" scale={4} />
          <div className="flex flex-col gap-1">
            <p className="pixel-label text-accent">Sem sinal do GitHub</p>
            <p className="text-sm text-muted">
              Não foi possível carregar as estatísticas agora. Os dados voltam
              na próxima atualização.
            </p>
          </div>
        </div>
        <PixelButton href={profileUrl} external variant="secondary">
          Ver perfil
        </PixelButton>
      </div>
    )
  }

  const maxLanguageRepos = Math.max(
    1,
    ...stats.topLanguages.map((language) => language.repos),
  )

  return (
    <div className="flex flex-col gap-6">
      <ScoreBoard
        items={[
          { label: 'Repositórios', value: stats.publicRepos },
          { label: 'Seguidores', value: stats.followers },
          { label: 'Estrelas', value: stats.totalStars },
          { label: 'Forks', value: stats.totalForks },
        ]}
      />

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        {stats.topLanguages.length > 0 ? (
          <div className="pixel-frame flex flex-col gap-4 p-5">
            <h3 className="pixel-label text-ink">Linguagens mais usadas</h3>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {stats.topLanguages.map((language, index) => (
                <PlayerStat
                  key={language.name}
                  label={language.name}
                  valueLabel={`${language.repos} ${language.repos === 1 ? 'repo' : 'repos'}`}
                  percent={(language.repos / maxLanguageRepos) * 100}
                  index={index}
                />
              ))}
            </dl>
          </div>
        ) : (
          <span />
        )}

        <PixelButton href={profileUrl} external variant="secondary">
          Abrir GitHub
        </PixelButton>
      </div>
    </div>
  )
}

export const GitHubStats = async ({ username }: GitHubStatsProps) => {
  const stats = await GithubService.getStats(username)

  return (
    <GitHubStatsView
      stats={stats}
      profileUrl={GithubService.getProfileUrl(username)}
    />
  )
}

export const GitHubStatsSkeleton = () => {
  return (
    <div aria-busy="true" className="flex flex-col gap-6">
      <p className="sr-only">Carregando estatísticas do GitHub…</p>
      <div className="grid grid-cols-2 gap-[2px] border-2 border-line bg-line sm:grid-cols-4">
        {['repos', 'followers', 'stars', 'forks'].map((key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 bg-bg px-3 py-5"
          >
            <span className="h-8 w-12 bg-surface-2 motion-safe:animate-pulse" />
            <span className="h-2 w-16 bg-surface-2" />
          </div>
        ))}
      </div>
      <p className="pixel-label on-pitch text-ink">
        Carregando<span className="animate-blink">_</span>
      </p>
    </div>
  )
}
