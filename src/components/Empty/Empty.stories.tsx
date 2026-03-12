import { expect, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'

import { Empty } from './Empty'

const meta = {
  title: 'Components/Empty',
  component: Empty,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: [
        'title',
        'description',
        'surfaceTone',
        'cardBackgroundColor',
        'borderColor',
        'titleColor',
        'bodyColor',
      ],
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
    cardBackgroundColor: {
      control: 'color',
    },
    borderColor: {
      control: 'color',
    },
    titleColor: {
      control: 'color',
    },
    bodyColor: {
      control: 'color',
    },
  },
  render: ({
    title,
    description,
    surfaceTone,
    cardBackgroundColor,
    borderColor,
    titleColor,
    bodyColor,
  }: any) => (
    <StorySurface surfaceTone={surfaceTone} className="p-6 sm:p-8">
      <Empty>
        <div
          className="rounded-xl border p-6 text-center"
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor,
          }}
        >
          <p className="text-xl font-semibold" style={{ color: titleColor }}>
            {title}
          </p>
          <p className="mt-2" style={{ color: bodyColor }}>
            {description}
          </p>
        </div>
      </Empty>
    </StorySurface>
  ),
  args: {
    title: 'Nenhum post encontrado',
    description: 'Ajuste os filtros ou volte mais tarde para novos conteúdos.',
    surfaceTone: 'primary',
    cardBackgroundColor: 'rgba(26, 26, 46, 0.4)',
    borderColor: 'rgba(139, 92, 246, 0.3)',
    titleColor: '#f9fafb',
    bodyColor: '#d1d5db',
  },
}

export default meta

export const Default = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.title)).toBeInTheDocument()
    await expect(canvas.getByText(args.description)).toBeInTheDocument()
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
