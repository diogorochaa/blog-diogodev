import { beforeEach, describe, expect, it, vi } from 'vitest'

const { revalidateTagMock } = vi.hoisted(() => ({
  revalidateTagMock: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidateTag: revalidateTagMock,
}))

const SECRET = 'test-webhook-secret'

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    revalidateTagMock.mockClear()
    vi.stubEnv('PRISMIC_WEBHOOK_SECRET', SECRET)
  })

  it('revalidates prismic tag when secret is valid', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${SECRET}`,
        },
      }),
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(revalidateTagMock).toHaveBeenCalledWith('prismic', 'max')
    expect(payload.revalidated).toBe(true)
    expect(typeof payload.now).toBe('number')
  })

  it('returns 401 when authorization header is missing', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/revalidate', { method: 'POST' }),
    )
    const payload = await response.json()

    expect(response.status).toBe(401)
    expect(payload.error).toBe('Unauthorized')
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('returns 401 when secret is invalid', async () => {
    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        headers: {
          authorization: 'Bearer wrong-secret',
        },
      }),
    )

    expect(response.status).toBe(401)
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })

  it('returns 500 when webhook secret is not configured', async () => {
    vi.stubEnv('PRISMIC_WEBHOOK_SECRET', '')

    const { POST } = await import('./route')
    const response = await POST(
      new Request('http://localhost/api/revalidate', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${SECRET}`,
        },
      }),
    )
    const payload = await response.json()

    expect(response.status).toBe(500)
    expect(payload.error).toContain('not configured')
    expect(revalidateTagMock).not.toHaveBeenCalled()
  })
})
