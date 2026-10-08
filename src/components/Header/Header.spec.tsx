import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

const serviceMocks = vi.hoisted(() => ({
  getSearchIndex: vi.fn(),
  getHeaderPages: vi.fn(),
}))

vi.mock('@/components/HeaderSearch', () => ({
  HeaderSearch: () => <div data-testid="header-search" />,
}))

vi.mock('@/components/Logo', () => ({
  Logo: () => <div>Logo</div>,
}))

vi.mock('@/components/MainNav', () => ({
  MainNav: ({ items }: { items: Array<{ title: string; href: string }> }) => (
    <nav>
      {items.map((item) => (
        <a key={item.href} href={item.href}>
          {item.title}
        </a>
      ))}
    </nav>
  ),
}))

vi.mock('@/services', () => ({
  ContentService: {
    getHeaderPages: serviceMocks.getHeaderPages,
  },
  PostService: {
    getSearchIndex: serviceMocks.getSearchIndex,
  },
}))

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('merges fixed nav items with Prismic header pages', async () => {
    serviceMocks.getSearchIndex.mockResolvedValue([])
    serviceMocks.getHeaderPages.mockResolvedValue([
      {
        uid: 'labs',
        navLabel: 'Labs',
      },
    ])

    render(await Header())

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: 'Perfil' })).toHaveAttribute(
      'href',
      '/about',
    )
    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/blog',
    )
    expect(screen.getByRole('link', { name: 'Labs' })).toHaveAttribute(
      'href',
      '/pages/labs',
    )
  })
})
