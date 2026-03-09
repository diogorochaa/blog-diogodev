import { redirectToPreviewURL } from '@prismicio/next'
import { NextRequest, NextResponse } from 'next/server'

import { createClient, hasPrismicConfig } from '../../../prismicio'

// Preview must always be runtime-handled to avoid static prerender in CI builds.
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  if (!hasPrismicConfig) {
    return NextResponse.json(
      { error: 'Prismic preview is not configured in this environment.' },
      { status: 503 },
    )
  }

  const client = createClient()

  return await redirectToPreviewURL({ client, request })
}
