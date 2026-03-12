import type { Route } from 'next'

import { expect, userEvent, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'
import { MainNav } from './MainNav'

const meta = {
  title: 'Components/MainNav',
  component: MainNav,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: ['homeLabel', 'aboutLabel', 'surfaceTone'],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
      router: {
        pathname: '/',
      },
    },
    viewport: {
      disable: false,
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
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ homeLabel, aboutLabel, surfaceTone }: any) => (
    <StorySurface surfaceTone={surfaceTone} className="min-h-56 p-4 lg:p-6">
      <MainNav
        items={[
          { title: homeLabel, href: '/' as Route },
          { title: aboutLabel, href: '/about' as Route },
        ]}
      />
    </StorySurface>
  ),
  args: {
    homeLabel: 'Home',
    aboutLabel: 'Sobre mim',
    surfaceTone: 'primary',
  },
}

export default meta

export const HomeActive = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: args.homeLabel }),
    ).toHaveAttribute('aria-current', 'page')
  },
}

export const AboutActive = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/about',
      },
      router: {
        pathname: '/about',
      },
    },
  },
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: args.aboutLabel }),
    ).toHaveAttribute('aria-current', 'page')
  },
}

export const AboutNestedRouteActive = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/about/experiencia',
      },
      router: {
        pathname: '/about/experiencia',
      },
    },
  },
}

export const MobileMenuOpen = {
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Abrir menu' })

    await userEvent.click(toggle)

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(
      canvas.getByRole('link', { name: args.aboutLabel }),
    ).toBeInTheDocument()
  },
}
