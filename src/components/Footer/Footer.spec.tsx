import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

const serviceMocks = vi.hoisted(() => ({
  getFooterPages: vi.fn(),
  getPlayerData: vi.fn(),
}))

vi.mock('@/components/Logo', () => ({
  Logo: () => <div>Logo</div>,
}))

vi.mock('@/services', () => ({
  ContentService: {
    getFooterPages: serviceMocks.getFooterPages,
  },
}))

vi.mock('@/lib/player', () => ({
  getPlayerData: serviceMocks.getPlayerData,
}))

describe('Footer', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('merges fixed footer links with Prismic footer pages and social links', async () => {
    serviceMocks.getFooterPages.mockResolvedValue([
      {
        uid: 'recursos',
        footerLabel: 'Recursos',
      },
    ])
    serviceMocks.getPlayerData.mockResolvedValue({
      identity: {
        links: [
          { kind: 'github', label: 'GitHub', href: 'https://github.com/x' },
        ],
      },
    })

    render(await Footer())

    expect(screen.getByRole('link', { name: 'Início' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: 'Perfil' })).toHaveAttribute(
      'href',
      '/about',
    )
    expect(screen.getByRole('link', { name: 'Recursos' })).toHaveAttribute(
      'href',
      '/pages/recursos',
    )
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/x',
    )
  })
})
