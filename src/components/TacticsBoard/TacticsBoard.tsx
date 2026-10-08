import { TACTICS_LINES, type TacticsLine } from '@/models'

import type { TacticsBoardProps } from './TacticsBoard.types'

const LINE_LABELS: Record<TacticsLine, string> = {
  ataque: 'Ataque',
  'meio-campo': 'Meio-campo',
  defesa: 'Defesa',
  goleiro: 'Goleiro',
}

export const TacticsBoard = ({ items, principles }: TacticsBoardProps) => {
  const lines = TACTICS_LINES.map((line) => ({
    line,
    players: items.filter((item) => item.line === line),
  })).filter((row) => row.players.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <div className="pixel-frame pitch-surface relative overflow-hidden p-4 sm:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-3 border-2 border-pitch-line sm:inset-5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-3 left-3 h-0.5 bg-pitch-line sm:right-5 sm:left-5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pitch-line"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 left-1/2 h-12 w-40 -translate-x-1/2 border-2 border-b-0 border-pitch-line sm:bottom-5"
        />

        <ol className="relative flex flex-col gap-6 py-2 sm:gap-10">
          {lines.map(({ line, players }) => (
            <li
              key={line}
              className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6"
            >
              <span className="pixel-label on-pitch w-24 shrink-0 text-center text-[10px] text-ink sm:text-left">
                {LINE_LABELS[line]}
              </span>
              <ul className="flex flex-1 flex-wrap items-stretch justify-center gap-3 sm:gap-4">
                {players.map((player) => (
                  <li
                    key={`${line}-${player.label}`}
                    className="flex min-w-32 max-w-48 flex-col items-center gap-2 border-2 border-ink bg-bg/90 px-3 py-3 text-center shadow-pixel"
                  >
                    <span
                      aria-hidden
                      className="h-3 w-3 bg-accent shadow-[0_0_0_2px_var(--color-bg),0_0_0_4px_var(--color-accent)]"
                    />
                    <span className="pixel-label text-[10px] text-ink">
                      {player.label}
                    </span>
                    {player.detail ? (
                      <span className="text-xs leading-snug text-muted">
                        {player.detail}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      {principles.length > 0 ? (
        <div className="flex flex-col gap-3">
          <h3 className="pixel-label on-pitch text-ink">Princípios de jogo</h3>
          <ul className="flex flex-wrap gap-2">
            {principles.map((principle) => (
              <li
                key={principle}
                className="border-2 border-line-strong bg-surface px-3 py-1.5 text-sm font-semibold text-ink"
              >
                {principle}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
