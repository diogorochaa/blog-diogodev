import { expect, userEvent, within } from 'storybook/test'
import type { PostSearchItem } from '@/models/post-search'
import { mockPosts } from '@/storybook/mocks/blog'
import { StorySurface } from '@/storybook/story-helpers'

import { HeaderSearch } from './header-search'

const mockSearchItems: PostSearchItem[] = mockPosts.map((post) => ({
  slug: post.slug,
  title: post.frontmatter.title,
  description: post.frontmatter.description,
  tags: post.frontmatter.tags,
  date: post.frontmatter.date,
  readingTime: post.readingTime,
}))

const meta = {
  title: 'Components/HeaderSearch',
  component: HeaderSearch,
  tags: ['autodocs', 'test'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
}

export default meta

export const Desktop = {
  render: () => (
    <StorySurface surfaceTone="primary" className="min-h-screen p-6">
      <div className="mx-auto max-w-md">
        <HeaderSearch items={mockSearchItems} />
      </div>
    </StorySurface>
  ),
  globals: {
    viewport: {
      value: 'desktop',
      isRotated: false,
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox', { name: '' })

    await userEvent.type(input, 'next')

    await expect(canvas.getByRole('option', { name: /Next.js/i })).toBeVisible()
  },
}

export const MobileOverlay = {
  render: () => (
    <StorySurface surfaceTone="primary" className="min-h-screen p-4">
      <HeaderSearch items={mockSearchItems} />
    </StorySurface>
  ),
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement)
    const openButton = canvas.getByRole('button', { name: 'Abrir busca' })

    await userEvent.click(openButton)

    await expect(canvas.getByPlaceholderText('Procurar...')).toBeInTheDocument()
  },
}
