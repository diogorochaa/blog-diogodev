import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

const getBearerToken = (request: Request) => {
  const authorization = request.headers.get('authorization')

  if (!authorization?.startsWith('Bearer ')) {
    return null
  }

  return authorization.slice('Bearer '.length).trim()
}

export async function POST(request: Request) {
  const secret = process.env.PRISMIC_WEBHOOK_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'Webhook secret is not configured.' },
      { status: 500 },
    )
  }

  const token = getBearerToken(request)

  if (!token || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  revalidateTag('prismic', 'max')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
