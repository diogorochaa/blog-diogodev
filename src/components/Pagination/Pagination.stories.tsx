import type { Route } from 'next'

import { expect, within } from 'storybook/test'

import { StorySurface, storySurfaceOptions } from '@/storybook/story-helpers'
import { Pagination } from './Pagination'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs', 'test'],
  parameters: {
    controls: {
      include: [
        'currentPage',
        'numbPages',
        'totalPosts',
        'postsPerPage',
        'surfaceTone',
      ],
    },
  },
  argTypes: {
    currentPage: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1,
      },
    },
    numbPages: {
      control: {
        type: 'number',
        min: 1,
        max: 20,
        step: 1,
      },
    },
    totalPosts: {
      control: {
        type: 'number',
        min: 0,
        max: 200,
        step: 1,
      },
    },
    postsPerPage: {
      control: {
        type: 'number',
        min: 1,
        max: 50,
        step: 1,
      },
    },
    surfaceTone: {
      control: 'select',
      options: storySurfaceOptions,
    },
  },
  render: ({
    currentPage,
    numbPages,
    totalPosts,
    postsPerPage,
    surfaceTone,
  }: any) => {
    const safeNumbPages = Math.max(1, numbPages)
    const safeCurrentPage = Math.min(Math.max(1, currentPage), safeNumbPages)

    const prevPage =
      safeCurrentPage <= 1
        ? ('/' as Route)
        : (`/page/${safeCurrentPage - 1}` as Route)

    const nextPage =
      safeCurrentPage >= safeNumbPages
        ? (`/page/${safeCurrentPage}` as Route)
        : (`/page/${safeCurrentPage + 1}` as Route)

    return (
      <StorySurface
        surfaceTone={surfaceTone}
        className="mx-auto max-w-5xl p-4 sm:p-6"
      >
        <Pagination
          currentPage={safeCurrentPage}
          numbPages={safeNumbPages}
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </StorySurface>
    )
  },
  args: {
    currentPage: 2,
    numbPages: 5,
    totalPosts: 48,
    postsPerPage: 10,
    surfaceTone: 'primary',
  },
}

export default meta

export const Middle = {
  play: async ({ canvasElement }: any) => {
    const canvas = within(canvasElement)

    await expect(canvas.getByText('2 de 5')).toBeInTheDocument()
    await expect(
      canvas.getByText('Mostrando 11-20 de 48 posts'),
    ).toBeInTheDocument()
  },
}

export const FirstPage = {
  args: {
    currentPage: 1,
  },
}

export const LastPage = {
  args: {
    currentPage: 5,
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
