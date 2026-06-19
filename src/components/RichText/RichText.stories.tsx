import type * as prismic from '@prismicio/client'

import { expect, within } from 'storybook/test'

import {
  StorySurface,
  type StorySurfaceTone,
  storySurfaceOptions,
} from '@/storybook/story-helpers'
import { RichText } from './RichText'

const createField = ({
  heading,
  paragraph,
  bulletOne,
  bulletTwo,
  command,
}: {
  heading: string
  paragraph: string
  bulletOne: string
  bulletTwo: string
  command: string
}) => {
  return [
    {
      type: 'heading2',
      text: heading,
      spans: [],
    },
    {
      type: 'paragraph',
      text: paragraph,
      spans: [],
    },
    {
      type: 'list-item',
      text: bulletOne,
      spans: [],
    },
    {
      type: 'list-item',
      text: bulletTwo,
      spans: [],
    },
    {
      type: 'preformatted',
      text: command,
      spans: [],
    },
  ] as unknown as prismic.RichTextField
}

const tableField = [
  {
    type: 'heading2',
    text: 'Zustand x Context API',
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
      {
        cells: [
          {
            type: 'data',
            content: [
              { type: 'paragraph', text: 'Mais re-renderizações', spans: [] },
            ],
          },
          {
            type: 'data',
            content: [
              { type: 'paragraph', text: 'Mais performático', spans: [] },
            ],
          },
        ],
      },
    ],
  },
] as unknown as prismic.RichTextField

const meta = {
  title: 'Components/RichText',
  component: RichText,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: [
        'heading',
        'paragraph',
        'bulletOne',
        'bulletTwo',
        'command',
        'surfaceTone',
      ],
    },
  },
  argTypes: {
    heading: {
      control: 'text',
    },
    paragraph: {
      control: 'text',
    },
    bulletOne: {
      control: 'text',
    },
    bulletTwo: {
      control: 'text',
    },
    command: {
      control: 'text',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({
    heading,
    paragraph,
    bulletOne,
    bulletTwo,
    command,
    surfaceTone,
  }: {
    heading: string
    paragraph: string
    bulletOne: string
    bulletTwo: string
    command: string
    surfaceTone: StorySurfaceTone
  }) => (
    <StorySurface surfaceTone={surfaceTone} className="p-6 sm:p-8">
      <article className="mx-auto max-w-3xl">
        <RichText
          field={createField({
            heading,
            paragraph,
            bulletOne,
            bulletTwo,
            command,
          })}
        />
      </article>
    </StorySurface>
  ),
  args: {
    heading: 'Documentacao orientada por componentes',
    paragraph:
      'Com stories reais, o time consegue validar estados visuais e comportamento sem depender da pagina completa.',
    bulletOne: 'Defina cenarios com dados representativos.',
    bulletTwo: 'Mantenha stories pequenos e focados.',
    command: 'npm run storybook',
    surfaceTone: 'primary',
  },
}

export default meta

export const Default = {
  play: async ({
    canvasElement,
    args,
  }: {
    canvasElement: HTMLElement
    args: { heading: string; command: string }
  }) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.heading)).toBeInTheDocument()
    await expect(canvas.getByText(args.command)).toBeInTheDocument()
  },
}

export const MobilePreview = {
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
}

export const WithTable = {
  render: ({ surfaceTone }: { surfaceTone: StorySurfaceTone }) => (
    <StorySurface surfaceTone={surfaceTone} className="p-4 sm:p-8">
      <article className="mx-auto max-w-3xl">
        <RichText field={tableField} />
      </article>
    </StorySurface>
  ),
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
}
