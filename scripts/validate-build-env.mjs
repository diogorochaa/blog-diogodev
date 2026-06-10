const shouldValidate = process.env.CI === 'true' || process.env.VERCEL === '1'

if (!shouldValidate) {
  process.exit(0)
}

const repositoryName = process.env.PRISMIC_REPOSITORY_NAME?.trim()

if (!repositoryName) {
  console.error(
    [
      'Build abortado: PRISMIC_REPOSITORY_NAME nao esta definido.',
      'Configure nas Environment Variables da Vercel ou em GitHub > Settings > Secrets and variables > Actions > Variables (PRISMIC_REPOSITORY_NAME).',
    ].join('\n'),
  )
  process.exit(1)
}

if (!process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
  console.warn(
    'Aviso: NEXT_PUBLIC_SITE_URL nao definido. Canonical e Open Graph usarao fallback.',
  )
}

const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 15_000)

try {
  const url = new URL('/api/v2', `https://${repositoryName}.cdn.prismic.io`)
  const headers = {}

  if (process.env.PRISMIC_ACCESS_TOKEN) {
    headers.Authorization = `Token ${process.env.PRISMIC_ACCESS_TOKEN}`
  }

  const response = await fetch(url, { headers, signal: controller.signal })

  if (!response.ok) {
    console.error(
      [
        `Build abortado: repositorio Prismic "${repositoryName}" inacessivel (HTTP ${response.status}).`,
        'Verifique PRISMIC_REPOSITORY_NAME e PRISMIC_ACCESS_TOKEN.',
      ].join('\n'),
    )
    process.exit(1)
  }

  console.log(`Prismic OK: ${repositoryName}`)
} catch (error) {
  const reason = error instanceof Error ? error.message : 'erro desconhecido'
  console.error(
    `Build abortado: nao foi possivel contactar o Prismic (${reason}).`,
  )
  process.exit(1)
} finally {
  clearTimeout(timeout)
}
