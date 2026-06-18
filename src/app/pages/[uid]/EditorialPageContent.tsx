import { JsonLd } from '@/components/JsonLd'
import { SliceRenderer } from '@/components/SliceRenderer'

import type { EditorialPageContentProps } from './page.types'

export const EditorialPageContent = ({
  page,
  jsonLd,
}: EditorialPageContentProps) => {
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-10 sm:gap-12">
      <JsonLd data={jsonLd} />

      <header className="flex max-w-3xl flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
          Página
        </p>
        <h1 className="text-gradient-vivid font-display text-4xl font-bold leading-tight sm:text-5xl">
          {page.title}
        </h1>
        {page.description ? (
          <p className="text-base leading-relaxed text-gray-300 sm:text-lg">
            {page.description}
          </p>
        ) : null}
      </header>

      <SliceRenderer slices={page.slices} />
    </main>
  )
}
