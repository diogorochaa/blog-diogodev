import { expect, within } from 'storybook/test'

import type { HomeContent } from '@/models'
import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'

import { Profile } from './Profile'

const mockHomeContent: HomeContent = {
  heroBadge: 'Developer Blog',
  title: 'Engenheiro de software e criador de conteúdo.',
  subtitle:
    'Bem vindo ao meu blog! Eu sou Diogo Rocha, apaixonado por tecnologia.',
  description: 'Blog onde falo sobre código e livros',
  featuredPostsLimit: 10,
  slices: [],
  ogTitle: 'Blog | diogodev_',
  ogDescription: 'Blog onde falo sobre código e livros',
}

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
          ...mockHomeContent,
          title,
          subtitle,
        }}
      />
    </StorySurface>
  ),
  args: {
    title: mockHomeContent.title,
    subtitle: mockHomeContent.subtitle,
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
