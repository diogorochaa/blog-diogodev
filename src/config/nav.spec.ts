import { describe, expect, it } from 'vitest'

import { mainNavConfig } from './nav'

describe('mainNavConfig', () => {
  it('contains the portfolio sections', () => {
    const hrefs = mainNavConfig.mainNav.map((item) => item.href)

    expect(hrefs).toEqual(['/', '/about', '/projects', '/career', '/blog'])
  })
})
