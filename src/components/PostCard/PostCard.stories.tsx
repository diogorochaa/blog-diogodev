import { expect, within } from 'storybook/test'

import {
  StorySurface,
  createMockPost,
  splitCommaSeparatedValues,
  storySurfaceOptions,
} from '@/storybook/story-helpers'
import { PostCard } from './PostCard'

const meta = {
  title: 'Components/PostCard',
  component: PostCard,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: [
        'title',
        'description',
        'date',
        'readingTime',
        'tagsInput',
        'slug',
        'isMain',
        'surfaceTone',
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
    date: {
      control: 'text',
    },
    readingTime: {
      control: {
        type: 'number',
        min: 1,
        max: 30,
        step: 1,
      },
    },
    tagsInput: {
      name: 'tags',
      control: 'text',
    },
    slug: {
      control: 'text',
    },
    isMain: {
      control: 'boolean',
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({
    title,
    description,
    date,
    readingTime,
    tagsInput,
    slug,
    isMain,
    surfaceTone,
  }: any) => {
    const post = createMockPost({
      title,
      description,
      date,
      readingTime,
      slug,
      tags: splitCommaSeparatedValues(tagsInput),
    })

    return (
      <StorySurface surfaceTone={surfaceTone} className="mx-auto max-w-4xl p-4 sm:p-6">
        <PostCard post={post} isMain={isMain} />
      </StorySurface>
    )
  },
  args: {
    title: 'Arquitetura Next.js + Prismic para blogs escalaveis',
    description:
      'Como estruturar paginas, servicos e componentes para manter o crescimento do projeto sem perder legibilidade.',
    date: '2026-03-07T10:00:00.000Z',
    readingTime: 8,
    tagsInput: 'nextjs, prismic, arquitetura',
    slug: 'arquitetura-nextjs-prismic',
    isMain: false,
    surfaceTone: 'primary',
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

export const MainHighlight = {
  args: {
    isMain: true,
  },
}

export const WithoutTags = {
  args: {
    title: 'Storybook: documentacao viva de componentes',
    description:
      'Padroes para transformar seu design system em referencia de uso para todo o time.',
    date: '2026-03-05T14:30:00.000Z',
    readingTime: 6,
    tagsInput: '',
    slug: 'storybook-como-documentar-componentes',
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
