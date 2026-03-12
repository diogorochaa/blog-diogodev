import type * as prismic from '@prismicio/client'

import { expect, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'
import { Mdx } from './Mdx'

const createField = ({
  heading,
  paragraph,
  bulletOne,
  bulletTwo,
  command,
}: any) => {
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

const meta = {
  title: 'Components/Mdx',
  component: Mdx,
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
  }: any) => (
    <StorySurface surfaceTone={surfaceTone} className="p-6 sm:p-8">
      <article className="mx-auto max-w-3xl">
        <Mdx
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
  play: async ({ canvasElement, args }: any) => {
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
