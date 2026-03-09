import { describe, expect, it } from 'vitest'

import { mainNavConfig } from './nav'

describe('mainNavConfig', () => {
  it('contains home and about links', () => {
    const hrefs = mainNavConfig.mainNav.map((item) => item.href)

    expect(hrefs).toContain('/')
    expect(hrefs).toContain('/about')
  })
})
