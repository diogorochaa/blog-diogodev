import * as prismic from '@prismicio/client'
import { PrismicTable } from '@prismicio/react'
import type { ReactNode } from 'react'

import { SectionHeading } from '@/components/SectionHeading'

import type { PrismicSlice } from '../slice.types'
import { getTableField, getTextField } from '../slice.types'

type TableSectionProps = {
  slice: PrismicSlice
}

const widthClassNames = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
} as const

const tableComponents = {
  table: ({ children }: { children: ReactNode }) => (
    <table className="min-w-full border-collapse text-sm">{children}</table>
  ),
  thead: ({ children }: { children: ReactNode }) => <thead>{children}</thead>,
  tbody: ({ children }: { children: ReactNode }) => <tbody>{children}</tbody>,
  tr: ({ children }: { children: ReactNode }) => (
    <tr className="border-b-2 border-line">{children}</tr>
  ),
  th: ({ children }: { children: ReactNode }) => (
    <th
      scope="col"
      className="min-w-40 bg-surface-2 px-4 py-3 text-left text-sm font-semibold text-ink align-top"
    >
      {children}
    </th>
  ),
  td: ({ children }: { children: ReactNode }) => (
    <td className="min-w-40 px-4 py-3 text-left text-sm text-ink/85 align-top">
      {children}
    </td>
  ),
  paragraph: ({ children }: { children: ReactNode }) => (
    <p className="text-sm leading-6 text-ink/85">{children}</p>
  ),
  strong: ({ children }: { children: ReactNode }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }: { children: ReactNode }) => <em>{children}</em>,
}

export const TableSection = ({ slice }: TableSectionProps) => {
  const primary = slice.primary
  const eyebrow = getTextField(primary, 'eyebrow')
  const title = getTextField(primary, 'title')
  const description = getTextField(primary, 'description')
  const table = getTableField(primary, 'table')
  const width = getTextField(primary, 'width', 'default')
  const widthClass =
    widthClassNames[width as keyof typeof widthClassNames] ??
    widthClassNames.default

  if (!title && !eyebrow && !description && !prismic.isFilled.table(table)) {
    return null
  }

  return (
    <section className={`mx-auto w-full ${widthClass}`}>
      {title ? (
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      ) : eyebrow ? (
        <p className="pixel-label mb-4 text-[9px] text-accent">{eyebrow}</p>
      ) : null}

      {prismic.isFilled.table(table) ? (
        <section
          className="rich-text w-full overflow-x-auto border-2 border-line bg-surface"
          aria-label={title ? `Tabela: ${title}` : 'Tabela de conteúdo'}
        >
          <PrismicTable field={table} components={tableComponents} />
        </section>
      ) : null}
    </section>
  )
}

export default TableSection
