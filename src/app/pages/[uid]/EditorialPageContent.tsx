import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonLd } from '@/components/JsonLd'
import { SliceRenderer } from '@/components/SliceRenderer'

import type { EditorialPageContentProps } from './page.types'

export const EditorialPageContent = ({
  page,
  jsonLd,
}: EditorialPageContentProps) => {
  return (
    <main className="screen-enter flex flex-col gap-10 sm:gap-12">
      <JsonLd data={jsonLd} />

      <header className="flex max-w-3xl flex-col gap-3">
        <Breadcrumbs
          items={[{ label: 'Início', href: '/' }, { label: page.title }]}
        />
        <p className="pixel-label mt-3 text-[9px] text-accent">Página</p>
        <h1 className="font-display text-4xl leading-tight font-extrabold text-ink sm:text-5xl">
          {page.title}
        </h1>
        {page.description ? (
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {page.description}
          </p>
        ) : null}
      </header>

      <SliceRenderer slices={page.slices} />
    </main>
  )
}
