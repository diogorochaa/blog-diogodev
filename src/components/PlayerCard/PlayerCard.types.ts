import type { PlayerStatProps } from '@/components/PlayerStat'
import type { PlayerIdentity } from '@/utils/player-identity'

export type PlayerCardStat = Omit<PlayerStatProps, 'index'>

export type PlayerCardProps = {
  identity: PlayerIdentity
  overall: number | null
  stats: PlayerCardStat[]
  statsTitle: string
  /** Clarifies that attributes are illustrative, not objective metrics. */
  statsNote?: string
}
