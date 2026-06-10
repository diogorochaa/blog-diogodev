'use client'

import NextLink from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center">
      <h1 className="font-display text-4xl font-bold text-white">
        Algo deu errado
      </h1>
      <p className="mt-4 text-lg text-gray-400">
        Não foi possível carregar esta página. Tente novamente ou volte ao
        início.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-accent-cyan/40 bg-secondary/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan"
        >
          Tentar novamente
        </button>
        <NextLink
          href="/"
          className="rounded-lg border border-accent-purple/40 bg-secondary/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-purple hover:text-accent-cyan"
        >
          Voltar ao início
        </NextLink>
      </div>
    </main>
  )
}
