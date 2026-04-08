import type { Route } from 'next'

import { expect, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'
import { Footer } from './Footer'

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['homeLabel', 'aboutLabel', 'showSecondaryLink', 'surfaceTone'],
    },
  },
  argTypes: {
    homeLabel: {
      name: 'home label',
      control: 'text',
    },
    aboutLabel: {
      name: 'about label',
      control: 'text',
    },
    showSecondaryLink: {
      control: 'boolean',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ homeLabel, aboutLabel, showSecondaryLink, surfaceTone }: any) => {
    const items = [{ title: homeLabel, href: '/' as Route }]

    if (showSecondaryLink) {
      items.push({ title: aboutLabel, href: '/about' as Route })
    }

    return (
      <StorySurface surfaceTone={surfaceTone} className="min-h-screen">
        <Footer items={items} />
      </StorySurface>
    )
  },
  args: {
    homeLabel: 'Home',
    aboutLabel: 'Sobre mim',
    showSecondaryLink: true,
    surfaceTone: 'primary',
  },
}

export default meta

export const Default = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: args.homeLabel }),
    ).toBeInTheDocument()
    await expect(canvas.getByText('Social')).toBeInTheDocument()
  },
}

export const SingleLink = {
  args: {
    showSecondaryLink: false,
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
