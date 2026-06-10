import { expect, within } from 'storybook/test'

import { mockPosts } from '@/storybook/mocks/blog'
import {
  createMockPost,
  StorySurface,
  storySurfaceOptions,
} from '@/storybook/story-helpers'
import { PostsList } from './PostsList'

const meta = {
  title: 'Components/PostsList',
  component: PostsList,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: ['count', 'featuredTitle', 'layout', 'surfaceTone'],
    },
  },
  argTypes: {
    count: {
      control: {
        type: 'range',
        min: 1,
        max: mockPosts.length,
        step: 1,
      },
    },
    featuredTitle: {
      name: 'featured title',
      control: 'text',
    },
    layout: {
      control: 'select',
      options: ['home', 'grid'],
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({ count, featuredTitle, layout, surfaceTone }: any) => {
    const posts = mockPosts.slice(0, Math.max(1, count)).map((_, index) => {
      return createMockPost({
        index,
        title: index === 0 ? featuredTitle : undefined,
      })
    })

    return (
      <StorySurface
        surfaceTone={surfaceTone}
        className="mx-auto max-w-6xl p-4 sm:p-6"
      >
        <PostsList posts={posts} layout={layout} />
      </StorySurface>
    )
  },
  args: {
    count: mockPosts.length,
    featuredTitle: 'Arquitetura Next.js + Prismic para blogs escalaveis',
    layout: 'home',
    surfaceTone: 'primary',
  },
}

export default meta

export const Default = {
  play: async ({ canvasElement, args }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText(args.featuredTitle)).toBeInTheDocument()
  },
}

export const GridOnly = {
  args: {
    layout: 'grid',
  },
}

export const Compact = {
  args: {
    count: 3,
  },
}

export const MobilePreview = {
  args: {
    count: 3,
  },
  globals: {
    viewport: {
      value: 'iphone12',
      isRotated: false,
    },
  },
}
