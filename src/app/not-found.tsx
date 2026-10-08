import { GameOver } from '@/components/GameOver'
import { notFoundMetadata } from '@/lib/seo/notFoundMetadata'

export const metadata = notFoundMetadata

export default function NotFound() {
  return (
    <GameOver
      title="Página não encontrada"
      description="O endereço pode estar incorreto ou a página foi removida. A partida continua em outro campo."
    />
  )
}
