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

const getMasterRef = (repository) => {
  const masterRef = repository.refs?.find((ref) => ref.isMasterRef)

  return masterRef?.ref
}

const validateSingletonDocument = async ({
  type,
  ref,
  repositoryName,
  accessToken,
}) => {
  const url = new URL(
    '/api/v2/documents/search',
    `https://${repositoryName}.cdn.prismic.io`,
  )
  url.searchParams.set('ref', ref)
  url.searchParams.set('q', `[[at(document.type, "${type}")]]`)
  url.searchParams.set('pageSize', '1')

  if (accessToken) {
    url.searchParams.set('access_token', accessToken)
  }

  const response = await fetch(url, { signal: controller.signal })

  if (!response.ok) {
    console.error(
      [
        `Build abortado: nao foi possivel validar o singleton Prismic "${type}" (HTTP ${response.status}).`,
        'Verifique PRISMIC_REPOSITORY_NAME e PRISMIC_ACCESS_TOKEN.',
      ].join('\n'),
    )
    process.exit(1)
  }

  const data = await response.json()

  if (!data.results_size) {
    console.error(
      [
        `Build abortado: documento singleton Prismic "${type}" nao encontrado.`,
        `Crie e publique o documento "${type}" antes do deploy. O projeto nao usa fallback local para esse conteudo.`,
      ].join('\n'),
    )
    process.exit(1)
  }
}

try {
  const url = new URL('/api/v2', `https://${repositoryName}.cdn.prismic.io`)
  const accessToken = process.env.PRISMIC_ACCESS_TOKEN
  const headers = {}

  if (accessToken) {
    headers.Authorization = `Token ${accessToken}`
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

  const repository = await response.json()
  const ref = getMasterRef(repository)

  if (!ref) {
    console.error(
      `Build abortado: nao foi possivel resolver o master ref do Prismic "${repositoryName}".`,
    )
    process.exit(1)
  }

  await Promise.all(
    ['home', 'about'].map((type) =>
      validateSingletonDocument({ type, ref, repositoryName, accessToken }),
    ),
  )

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
