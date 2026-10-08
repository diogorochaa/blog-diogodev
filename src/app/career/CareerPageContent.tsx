import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CareerTimeline } from '@/components/CareerTimeline'
import { GameSection } from '@/components/GameSection'
import { JsonLd } from '@/components/JsonLd'
import { PixelButton } from '@/components/PixelButton'
import { RetroEmptyState } from '@/components/RetroEmptyState'

import { CAREER_DESCRIPTION } from './career.constants'
import type { CareerPageContentProps } from './career.types'

export const CareerPageContent = ({
  entries,
  careerJsonLd,
}: CareerPageContentProps) => {
  return (
    <main className="screen-enter flex flex-col gap-6">
      <JsonLd data={careerJsonLd} />
      <Breadcrumbs
        items={[{ label: 'Início', href: '/' }, { label: 'Carreira' }]}
      />
      <GameSection
        id="career"
        label="Trajetória"
        title="Modo carreira"
        description={CAREER_DESCRIPTION}
        headingLevel="h1"
      >
        {entries.length > 0 ? (
          <CareerTimeline entries={entries} variant="full" headingLevel="h2" />
        ) : (
          <RetroEmptyState
            sprite="shirt"
            title="Temporadas em atualização"
            description="O histórico de carreira ainda está sendo cadastrado. Enquanto isso, o perfil completo do jogador está disponível."
          >
            <PixelButton href="/about" variant="secondary">
              Ver perfil
            </PixelButton>
          </RetroEmptyState>
        )}
      </GameSection>
    </main>
  )
}
