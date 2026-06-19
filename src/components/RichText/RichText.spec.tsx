import type { RichTextField } from '@prismicio/client'
import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { RichText } from './RichText'

afterEach(() => {
  cleanup()
})

const tableField = [
  {
    type: 'paragraph',
    text: 'Comparativo de estado',
    spans: [],
  },
  {
    type: 'table',
    head: [
      {
        cells: [
          {
            type: 'header',
            content: [{ type: 'paragraph', text: 'Context API', spans: [] }],
          },
          {
            type: 'header',
            content: [{ type: 'paragraph', text: 'Zustand', spans: [] }],
          },
        ],
      },
    ],
    body: [
      {
        cells: [
          {
            type: 'data',
            content: [
              { type: 'paragraph', text: 'Necessita Provider', spans: [] },
            ],
          },
          {
            type: 'data',
            content: [{ type: 'paragraph', text: 'Não', spans: [] }],
          },
        ],
      },
    ],
  },
] as unknown as RichTextField

describe('RichText', () => {
  it('renders Prismic table blocks responsively', () => {
    render(<RichText field={tableField} />)

    const table = screen.getByRole('table')

    expect(screen.getByText('Comparativo de estado')).toBeInTheDocument()
    expect(
      within(table).getByRole('columnheader', { name: 'Context API' }),
    ).toBeInTheDocument()
    expect(
      within(table).getByRole('columnheader', { name: 'Zustand' }),
    ).toBeInTheDocument()
    expect(within(table).getByText('Necessita Provider')).toBeInTheDocument()
    expect(within(table).getByText('Não')).toBeInTheDocument()
  })

  it('renders markdown table text as a responsive table', () => {
    render(
      <RichText
        field={
          [
            {
              type: 'paragraph',
              text: [
                '| Context API | Zustand |',
                '| --- | --- |',
                '| API nativa | API minimalista |',
              ].join('\n'),
              spans: [],
            },
          ] as unknown as RichTextField
        }
      />,
    )

    const table = screen.getByRole('table')

    expect(
      within(table).getByRole('columnheader', { name: 'Context API' }),
    ).toBeInTheDocument()
    expect(
      within(table).getByRole('columnheader', { name: 'Zustand' }),
    ).toBeInTheDocument()
    expect(within(table).getByText('API minimalista')).toBeInTheDocument()
  })
})
