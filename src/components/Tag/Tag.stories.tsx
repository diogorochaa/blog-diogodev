import { expect, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'

import { Tag } from './Tag'

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'centered',
    controls: {
      include: ['label', 'size', 'surfaceTone'],
    },
  },
  argTypes: {
    label: {
      control: 'text',
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ label, size, surfaceTone }: any) => (
    <StorySurface
      surfaceTone={surfaceTone}
      className="flex min-h-40 items-center justify-center p-6"
    >
      <Tag size={size}>{label}</Tag>
    </StorySurface>
  ),
  args: {
    label: 'typescript',
    size: 'sm',
    surfaceTone: 'primary',
  },
}

export default meta

export const Playground = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.label)).toBeInTheDocument()
  },
}

export const Medium = {
  args: {
    size: 'md',
  },
}

export const SizeScale = {
  render: ({ surfaceTone }: any) => (
    <StorySurface
      surfaceTone={surfaceTone}
      className="flex min-h-40 items-center justify-center p-6"
    >
      <div className="flex flex-wrap items-center gap-3">
        {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
          <Tag key={size} size={size}>
            design system
          </Tag>
        ))}
      </div>
    </StorySurface>
  ),
}

export const MobilePreview = {
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
}
