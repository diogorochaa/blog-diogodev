import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useBackToTop } from './useBackToTop'

describe('useBackToTop', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('keeps a single scroll listener while scrolling', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useBackToTop())

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)

    act(() => {
      Object.defineProperty(window, 'scrollY', {
        value: 120,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
      Object.defineProperty(window, 'scrollY', {
        value: 80,
        configurable: true,
      })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )
  })
})
