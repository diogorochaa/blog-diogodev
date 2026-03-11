import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidateTagMock } = vi.hoisted(() => ({
  revalidateTagMock: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidateTag: revalidateTagMock,
}))

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    revalidateTagMock.mockClear()
  })

  it('revalidates prismic tag and returns payload', async () => {
    const { POST } = await import('./route')
    const response = await POST()
    const payload = await response.json()

    expect(revalidateTagMock).toHaveBeenCalledWith('prismic', 'max')
    expect(payload.revalidated).toBe(true)
    expect(typeof payload.now).toBe('number')
  })
})
