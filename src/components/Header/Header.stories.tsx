import { expect, userEvent, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'

import { Header } from './Header'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      include: ['panelTitle', 'panelDescription', 'surfaceTone'],
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
  },
  argTypes: {
    panelTitle: {
      control: 'text',
    },
    panelDescription: {
      control: 'text',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ panelTitle, panelDescription, surfaceTone }: any) => (
    <StorySurface surfaceTone={surfaceTone} className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-5xl px-4 pt-28 sm:pt-32">
        <section className="rounded-xl border border-accent-purple/30 bg-secondary/50 p-6">
          <h2 className="text-2xl font-bold">{panelTitle}</h2>
          <p className="mt-2 text-gray-300">{panelDescription}</p>
        </section>
      </main>
    </StorySurface>
  ),
  args: {
    panelTitle: 'Canvas de navegacao',
    panelDescription:
      'Este cenario ajuda a validar estado ativo de menu e contraste do cabecalho sobre o conteudo da pagina.',
    surfaceTone: 'primary',
  },
}

export default meta

export const HomeActive = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.panelTitle)).toBeInTheDocument()
    await expect(
      canvas.getByRole('link', { name: 'Home' }),
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
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByRole('link', { name: 'Sobre mim' }),
    ).toHaveAttribute('aria-current', 'page')
  },
}

export const MobileMenuOpen = {
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Abrir menu' })

    await userEvent.click(toggle)

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(
      canvas.getByRole('link', { name: 'Sobre mim' }),
    ).toBeInTheDocument()
  },
}
