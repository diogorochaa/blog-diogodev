import { expect, within } from 'storybook/test'

import { siteConfig } from '@/config'
import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'

import { Profile } from './Profile'

const meta = {
  title: 'Components/Profile',
  component: Profile,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: ['title', 'subtitle', 'surfaceTone'],
    },
  },
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ title, subtitle, surfaceTone }: any) => (
    <StorySurface
      surfaceTone={surfaceTone}
      className="mx-auto max-w-4xl p-6 sm:p-10"
    >
      <Profile
        items={{
          ...siteConfig,
          title,
          subtitle,
        }}
      />
    </StorySurface>
  ),
  args: {
    title: siteConfig.title,
    subtitle: siteConfig.subtitle,
    surfaceTone: 'primary',
  },
}

export default meta

export const Default = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.title)).toBeInTheDocument()
    await expect(canvas.getByText(args.subtitle)).toBeInTheDocument()
  },
}

export const ShortSubtitle = {
  args: {
    subtitle:
      'Interface, performance e documentacao como parte do produto final.',
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
