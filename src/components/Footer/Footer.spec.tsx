import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

const serviceMocks = vi.hoisted(() => ({
  getFooterPages: vi.fn(),
}))

vi.mock('@/components/Logo', () => ({
  Logo: () => <div>Logo</div>,
}))

vi.mock('@/components/SocialMedia', () => ({
  SocialMedia: () => <div>Social links</div>,
}))

vi.mock('@/services', () => ({
  ContentService: {
    getFooterPages: serviceMocks.getFooterPages,
  },
}))

describe('Footer', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('merges fixed footer links with Prismic footer pages', async () => {
    serviceMocks.getFooterPages.mockResolvedValue([
      {
        uid: 'recursos',
        footerLabel: 'Recursos',
      },
    ])

    render(await Footer())

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    )
    expect(screen.getByRole('link', { name: 'Sobre mim' })).toHaveAttribute(
      'href',
      '/about',
    )
    expect(screen.getByRole('link', { name: 'Recursos' })).toHaveAttribute(
      'href',
      '/pages/recursos',
    )
  })
})
