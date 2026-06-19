import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TableSection } from './index'

const table = {
  head: {
    rows: [
      {
        key: 'head-row',
        cells: [
          {
            key: 'head-context',
            type: 'header',
            content: [{ type: 'paragraph', text: 'Context API', spans: [] }],
          },
          {
            key: 'head-zustand',
            type: 'header',
            content: [{ type: 'paragraph', text: 'Zustand', spans: [] }],
          },
        ],
      },
    ],
  },
  body: {
    rows: [
      {
        key: 'body-row',
        cells: [
          {
            key: 'body-context',
            type: 'data',
            content: [
              { type: 'paragraph', text: 'Necessita Provider', spans: [] },
            ],
          },
          {
            key: 'body-zustand',
            type: 'data',
            content: [{ type: 'paragraph', text: 'Não', spans: [] }],
          },
        ],
      },
    ],
  },
}

describe('TableSection', () => {
  it('renders a Prismic table field with heading content', () => {
    render(
      <TableSection
        slice={{
          slice_type: 'table_section',
          primary: {
            eyebrow: 'Comparativo',
            title: 'Zustand x Context API',
            description: 'Comparação rápida entre as opções.',
            table,
          },
        }}
      />,
    )

    const renderedTable = screen.getByRole('table')

    expect(screen.getByText('Comparativo')).toBeInTheDocument()
    expect(screen.getByText('Zustand x Context API')).toBeInTheDocument()
    expect(
      within(renderedTable).getByRole('columnheader', { name: 'Context API' }),
    ).toBeInTheDocument()
    expect(
      within(renderedTable).getByText('Necessita Provider'),
    ).toBeInTheDocument()
    expect(within(renderedTable).getByText('Não')).toBeInTheDocument()
  })
})
