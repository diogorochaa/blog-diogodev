import { act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { clearUrlHash, scrollToHeading } from './use-toc'

describe('scrollToHeading', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h2 id="section-a">Section A</h2>'
    window.history.replaceState(null, '', '/post#section-a')
  })

  afterEach(() => {
    document.body.innerHTML = ''
    window.history.replaceState(null, '', '/')
    vi.restoreAllMocks()
  })

  it('scrolls to the element without keeping the hash in the url', () => {
    const element = document.getElementById('section-a') as HTMLElement
    const scrollIntoView = vi.fn()
    element.scrollIntoView = scrollIntoView

    const replaceStateSpy = vi.spyOn(window.history, 'replaceState')

    act(() => {
      scrollToHeading('section-a')
    })

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '/post')
    expect(window.location.hash).toBe('')
  })
})

describe('clearUrlHash', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
    vi.restoreAllMocks()
  })

  it('removes hash from the current url', () => {
    window.history.replaceState(null, '', '/post?ref=home#section-a')

    clearUrlHash()

    expect(window.location.pathname).toBe('/post')
    expect(window.location.search).toBe('?ref=home')
    expect(window.location.hash).toBe('')
  })
})
