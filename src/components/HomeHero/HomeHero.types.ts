import type { RetroMenuItem } from '@/components/RetroMenu'
import type { PlayerIdentity } from '@/utils/player-identity'

export type HomeHeroProps = {
  identity: PlayerIdentity
  badge: string
  title: string
  subtitle: string
  menuItems: RetroMenuItem[]
}
