import * as prismic from '@prismicio/client'
import {
  type JSXMapSerializer,
  PrismicRichText,
  PrismicTable,
} from '@prismicio/react'
import { createElement, type ReactNode } from 'react'

import { getHeadingHtmlTag } from '@/utils/toc/extractTocFromRichText'

import '../../../styles/rich-text.css'
import { Note } from './components'
import type { RichTextProps } from './RichText.types'

const HEADING_CLASS_NAMES: Record<string, string> = {
  h2: 'rich-text mb-5 mt-14 scroll-mt-28 border-b-2 border-line pb-3 font-display text-2xl font-bold text-ink sm:mb-6 sm:mt-16 sm:text-3xl',
  h3: 'rich-text mb-4 mt-10 scroll-mt-28 font-display text-xl font-bold text-ink sm:text-2xl',
  h4: 'rich-text mb-4 mt-8 scroll-mt-28 font-display text-xl font-bold text-ink',
  h5: 'rich-text mb-4 mt-8 scroll-mt-28 text-lg font-bold text-ink',
  h6: 'rich-text mb-4 mt-8 scroll-mt-28 text-base font-bold text-ink',
}

type PrismicTableCell = {
  key?: string
  type?: 'header' | 'data'
  content?: prismic.RichTextField
}

type PrismicTableRow = {
  key?: string
  cells?: PrismicTableCell[]
}

type PrismicTableSection = {
  rows?: PrismicTableRow[]
}

type PrismicTableBlock = {
  type?: string
  text?: string
  data?: unknown
  head?: PrismicTableRow[] | PrismicTableSection
  body?: PrismicTableRow[] | PrismicTableSection
}

type RichTextBlock = prismic.RichTextField[number] | PrismicTableBlock

const getRichTextLinkProps = (linkField: prismic.LinkField) => {
  const href = prismic.asLink(linkField) || '#'
  const isExternal = /^https?:\/\//.test(href)

  return {
    href,
    isExternal,
  }
}

const createRichTextComponents = (
  headingIdsInOrder: string[],
): JSXMapSerializer => {
  let headingIndex = 0

  const nextHeadingId = () => headingIdsInOrder[headingIndex++] ?? undefined

  const renderHeading = (prismicType: string, children: ReactNode) => {
    const tag = getHeadingHtmlTag(prismicType)
    const id = nextHeadingId()

    return createElement(
      tag,
      {
        id,
        className: HEADING_CLASS_NAMES[tag],
      },
      children,
    )
  }

  return {
    heading1: ({ children }) => renderHeading('heading1', children),
    heading2: ({ children }) => renderHeading('heading2', children),
    heading3: ({ children }) => renderHeading('heading3', children),
    heading4: ({ children }) => renderHeading('heading4', children),
    heading5: ({ children }) => renderHeading('heading5', children),
    heading6: ({ children }) => renderHeading('heading6', children),
    paragraph: ({ children }) => (
      <p className="rich-text mb-5 text-[1.0625rem] leading-8 text-ink/85 sm:text-lg sm:leading-8">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="rich-text font-semibold text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="rich-text italic">{children}</em>,
    hyperlink: ({ node, children }) => {
      const { href, isExternal } = getRichTextLinkProps(node.data)

      return (
        <a
          className="rich-text font-medium text-accent-soft underline decoration-2 underline-offset-4 hover:text-accent"
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    },
    list: ({ children }) => (
      <ul className="rich-text mb-5 ml-5 list-[square] text-[1.0625rem] leading-8 text-ink/85 marker:text-accent sm:ml-8 sm:text-lg">
        {children}
      </ul>
    ),
    oList: ({ children }) => (
      <ol className="rich-text mb-5 ml-5 list-decimal text-[1.0625rem] leading-8 text-ink/85 marker:font-semibold marker:text-accent sm:ml-8 sm:text-lg">
        {children}
      </ol>
    ),
    listItem: ({ children }) => <li className="rich-text mb-2">{children}</li>,
    oListItem: ({ children }) => <li className="rich-text mb-2">{children}</li>,
    preformatted: ({ children }) => (
      <pre className="rich-text mb-5 mt-6 overflow-x-auto border-2 border-line bg-surface p-4 font-mono text-sm leading-6 text-ink shadow-pixel">
        {children}
      </pre>
    ),
    label: ({ node, children }) => {
      if (node.data.label === 'note') {
        return <Note>{children}</Note>
      }

      if (node.data.label === 'codespan') {
        return (
          <code className="rich-text relative border border-line-strong bg-surface-2 px-[0.4rem] py-[0.1rem] font-mono text-[0.9em] leading-tight text-score">
            {children}
          </code>
        )
      }

      return <span>{children}</span>
    },
  }
}

const tableCellComponents: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="text-sm leading-6 text-ink/85">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,
  hyperlink: ({ node, children }) => {
    const { href, isExternal } = getRichTextLinkProps(node.data)

    return (
      <a
        className="font-medium text-accent-soft underline decoration-2 underline-offset-4 hover:text-accent"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
}

const prismicTableComponents = {
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
  ...tableCellComponents,
}

const isTableBlock = (block: RichTextBlock): block is PrismicTableBlock => {
  if (!block || typeof block !== 'object') {
    return false
  }

  const table = getTableData(block)

  return Boolean(table.head.length || table.body.length)
}

const parseMarkdownTableLine = (line: string) => {
  const trimmedLine = line.trim()

  if (!trimmedLine.includes('|')) {
    return []
  }

  return trimmedLine
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

const isMarkdownDividerRow = (cells: string[]) => {
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell))
}

const getMarkdownTableRows = (text: string | undefined) => {
  if (!text) {
    return []
  }

  const rows = text
    .split('\n')
    .map(parseMarkdownTableLine)
    .filter((cells) => cells.length > 1)

  const columnCount = rows[0]?.length ?? 0

  if (rows.length < 2 || columnCount < 2) {
    return []
  }

  const hasConsistentColumns = rows.every((row) => row.length === columnCount)

  if (!hasConsistentColumns || !isMarkdownDividerRow(rows[1])) {
    return []
  }

  return rows
}

const isMarkdownTableBlock = (block: RichTextBlock) => {
  if (!block || typeof block !== 'object') {
    return false
  }

  return (
    getMarkdownTableRows('text' in block ? block.text : undefined).length > 0
  )
}

const normalizeTableRows = (
  section: PrismicTableRow[] | PrismicTableSection | undefined,
  rowPrefix: string,
) => {
  const rows = Array.isArray(section) ? section : (section?.rows ?? [])

  return rows.map((row, rowIndex) => ({
    ...row,
    key: row.key ?? `${rowPrefix}-row-${rowIndex}`,
    cells: (row.cells ?? []).map((cell, cellIndex) => ({
      ...cell,
      key: cell.key ?? `${rowPrefix}-cell-${rowIndex}-${cellIndex}`,
      type: cell.type ?? (rowPrefix === 'head' ? 'header' : 'data'),
      content: cell.content ?? [],
    })),
  }))
}

const getTableData = (block: PrismicTableBlock) => {
  const data =
    block.data && typeof block.data === 'object'
      ? (block.data as PrismicTableBlock)
      : block

  return {
    head: normalizeTableRows(data.head, 'head'),
    body: normalizeTableRows(data.body, 'body'),
  }
}

const getTableNodeKey = (prefix: string, value: unknown) => {
  return `${prefix}-${JSON.stringify(value)}`
}

const renderTable = (block: PrismicTableBlock) => {
  const { head, body } = getTableData(block)
  const tableField = {
    head: head.length > 0 ? { rows: head } : undefined,
    body: { rows: body },
  }

  return (
    <section
      className="rich-text my-6 w-full overflow-x-auto border-2 border-line bg-surface"
      key={getTableNodeKey('table', block)}
      aria-label="Tabela de conteúdo"
    >
      <PrismicTable
        field={tableField as never}
        components={prismicTableComponents}
      />
    </section>
  )
}

const renderMarkdownTable = (block: PrismicTableBlock) => {
  const rows = getMarkdownTableRows(block.text)
  const [headerRow, , ...bodyRows] = rows

  return (
    <section
      className="rich-text my-6 w-full overflow-x-auto border-2 border-line bg-surface"
      key={getTableNodeKey('markdown-table', block)}
      aria-label="Tabela de conteúdo"
    >
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-line">
            {headerRow.map((cell) => (
              <th
                key={getTableNodeKey('markdown-header-cell', cell)}
                scope="col"
                className="min-w-40 bg-surface-2 px-4 py-3 text-left text-sm font-semibold text-ink align-top"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row) => (
            <tr
              key={getTableNodeKey('markdown-row', row)}
              className="border-b-2 border-line"
            >
              {row.map((cell) => (
                <td
                  key={getTableNodeKey('markdown-cell', cell)}
                  className="min-w-40 px-4 py-3 text-left text-sm text-ink/85 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

const renderRichTextBlockGroup = (
  blocks: RichTextBlock[],
  components: JSXMapSerializer,
  key: string,
) => {
  if (!blocks.length) {
    return null
  }

  return (
    <PrismicRichText
      key={key}
      field={blocks as prismic.RichTextField}
      components={components}
    />
  )
}

const renderRichTextWithTables = (
  field: prismic.RichTextField,
  components: JSXMapSerializer,
) => {
  const output: ReactNode[] = []
  let currentRichTextBlocks: RichTextBlock[] = []

  ;(field as RichTextBlock[]).forEach((block) => {
    if (isTableBlock(block) || isMarkdownTableBlock(block)) {
      output.push(
        renderRichTextBlockGroup(
          currentRichTextBlocks,
          components,
          getTableNodeKey('rich-text', currentRichTextBlocks),
        ),
      )
      currentRichTextBlocks = []
      output.push(
        isTableBlock(block) ? renderTable(block) : renderMarkdownTable(block),
      )
      return
    }

    currentRichTextBlocks.push(block)
  })

  output.push(
    renderRichTextBlockGroup(
      currentRichTextBlocks,
      components,
      'rich-text-end',
    ),
  )

  return output.filter(Boolean)
}

export const RichText = ({
  field = [],
  headingIdsInOrder = [],
}: RichTextProps) => {
  const components = createRichTextComponents(headingIdsInOrder)

  return <>{renderRichTextWithTables(field, components)}</>
}
