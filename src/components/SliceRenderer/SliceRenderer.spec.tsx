import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import type { BlogPost } from '@/models'
import type { PrismicSlice } from '@/slices/slice.types'

import { SliceRenderer } from './SliceRenderer'

const serviceMocks = vi.hoisted(() => ({
  getAll: vi.fn(),
  getProfile: vi.fn(),
  getRepos: vi.fn(),
}))

vi.mock('@/services', () => ({
  GithubService: {
    getProfile: serviceMocks.getProfile,
    getRepos: serviceMocks.getRepos,
  },
  PostService: {
    getAll: serviceMocks.getAll,
  },
}))

vi.mock('@/slices', () => ({
  components: {
    about_intro_stats: () => <section>About intro</section>,
    card_grid: () => <section>Card grid</section>,
    github_projects: ({ repos }: { repos: Array<{ name: string }> }) => (
      <section>{repos.map((repo) => repo.name).join(', ')}</section>
    ),
    posts_feed: ({ posts }: { posts: BlogPost[] }) => (
      <section>
        {posts.map((post) => (
          <span key={post.slug}>{post.frontmatter.title}</span>
        ))}
      </section>
    ),
    profile_hero: () => <section>Profile hero</section>,
    recommended_posts: ({ posts }: { posts: BlogPost[] }) => (
      <section>
        {posts.map((post) => (
          <span key={post.slug}>{post.frontmatter.title}</span>
        ))}
      </section>
    ),
    rich_text_section: () => <section>Rich text</section>,
    table_section: () => <section>Table section</section>,
    technical_experience: () => <section>Technical experience</section>,
  },
}))

const makePost = (slug: string, title: string, tags: string[]): BlogPost => ({
  slug,
  readingTime: 3,
  body: [{ type: 'paragraph', text: title, spans: [] }],
  frontmatter: {
    title,
    description: `${title} description`,
    date: '2026-01-01',
    tags,
  },
})

describe('SliceRenderer', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('returns null for empty slices', async () => {
    expect(await SliceRenderer({ slices: [] })).toBeNull()
  })

  it('renders editorial slices without fetching dynamic services', async () => {
    const slices: PrismicSlice[] = [
      { slice_type: 'rich_text_section' },
      { slice_type: 'table_section' },
    ]

    render(await SliceRenderer({ slices }))

    expect(screen.getByText('Rich text')).toBeInTheDocument()
    expect(screen.getByText('Table section')).toBeInTheDocument()
    expect(serviceMocks.getAll).not.toHaveBeenCalled()
    expect(serviceMocks.getProfile).not.toHaveBeenCalled()
    expect(serviceMocks.getRepos).not.toHaveBeenCalled()
  })

  it('filters post slices by tag ignoring case and respects limit', async () => {
    serviceMocks.getAll.mockResolvedValue({
      posts: [
        makePost('react-a', 'React A', ['React']),
        makePost('node', 'Node', ['Node']),
        makePost('react-b', 'React B', ['react']),
      ],
    })
    const slices: PrismicSlice[] = [
      {
        slice_type: 'posts_feed',
        primary: {
          source: 'tag',
          tag: 'REACT',
          limit: 1,
        },
      },
    ]

    render(await SliceRenderer({ slices }))

    expect(screen.getByText('React A')).toBeInTheDocument()
    expect(screen.queryByText('React B')).not.toBeInTheDocument()
    expect(screen.queryByText('Node')).not.toBeInTheDocument()
    expect(serviceMocks.getAll).toHaveBeenCalledWith({ limit: 100 })
  })

  it('uses provided repos without fetching GitHub repos again', async () => {
    const slices: PrismicSlice[] = [
      {
        slice_type: 'github_projects',
        primary: {
          max_projects: 1,
        },
      },
    ]

    render(
      await SliceRenderer({
        slices,
        repos: [
          {
            id: 1,
            name: 'repo-a',
            description: null,
            html_url: 'https://github.com/a',
            language: 'TypeScript',
            stargazers_count: 1,
            forks_count: 0,
          },
          {
            id: 2,
            name: 'repo-b',
            description: null,
            html_url: 'https://github.com/b',
            language: 'TypeScript',
            stargazers_count: 1,
            forks_count: 0,
          },
        ],
      }),
    )

    expect(screen.getByText('repo-a')).toBeInTheDocument()
    expect(screen.queryByText('repo-b')).not.toBeInTheDocument()
    expect(serviceMocks.getRepos).not.toHaveBeenCalled()
  })
})
