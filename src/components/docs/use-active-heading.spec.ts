import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useActiveHeading } from './use-active-heading'

const mockBoundingRect = (element: HTMLElement, top: number) => {
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    top,
  } as DOMRect)
}

describe('useActiveHeading', () => {
  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = vi.fn()

    document.body.innerHTML = `
      <article id="post-content">
        <h1 id="intro">Intro</h1>
        <h2 id="conceitos">Conceitos</h2>
        <h3 id="participantes">Participantes</h3>
      </article>
    `
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  it('registers a passive scroll listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')

    renderHook(() =>
      useActiveHeading({
        headingIds: ['intro', 'conceitos', 'participantes'],
      }),
    )

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true },
    )
  })

  it('keeps the last heading above the scroll line active', async () => {
    const intro = document.getElementById('intro') as HTMLElement
    const conceitos = document.getElementById('conceitos') as HTMLElement
    const participantes = document.getElementById(
      'participantes',
    ) as HTMLElement

    mockBoundingRect(intro, 40)
    mockBoundingRect(conceitos, 90)
    mockBoundingRect(participantes, 140)

    const { result } = renderHook(() =>
      useActiveHeading({
        headingIds: ['intro', 'conceitos', 'participantes'],
      }),
    )

    expect(result.current).toBe('conceitos')

    mockBoundingRect(participantes, 80)

    await act(async () => {
      window.dispatchEvent(new Event('scroll'))
      await new Promise((resolve) => {
        requestAnimationFrame(() => resolve(undefined))
      })
    })

    expect(result.current).toBe('participantes')
  })

  it('scrolls to hash target on mount when location hash is set', async () => {
    window.location.hash = '#participantes'

    renderHook(() =>
      useActiveHeading({
        headingIds: ['intro', 'conceitos', 'participantes'],
      }),
    )

    await act(async () => {
      await new Promise((resolve) => {
        requestAnimationFrame(() => resolve(undefined))
      })
    })

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('removes scroll listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() =>
      useActiveHeading({
        headingIds: ['intro', 'conceitos'],
      }),
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
    )
  })
})
