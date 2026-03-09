import { describe, expect, it } from 'vitest'

import { siteConfig } from './site'

describe('siteConfig', () => {
  it('contains required base metadata', () => {
    expect(siteConfig.name).not.toBe('')
    expect(siteConfig.description).not.toBe('')
    expect(siteConfig.url.startsWith('http')).toBe(true)
  })

  it('contains social links', () => {
    expect(siteConfig.links.github).toContain('github.com')
    expect(siteConfig.links.linkedin).toContain('linkedin.com')
    expect(siteConfig.links.instagram).toContain('instagram.com')
  })
})
