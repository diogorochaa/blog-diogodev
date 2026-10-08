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
    <main className="flex flex-col items-center py-10 sm:py-16">
      <div className="pixel-frame flex w-full max-w-2xl flex-col items-center gap-5 px-6 py-10 text-center">
        <p aria-hidden className="font-pixel text-xl text-accent sm:text-3xl">
          Falta!
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">
          Algo deu errado
        </h1>
        <p className="max-w-md text-base text-muted">
          Não foi possível carregar esta página. Tente novamente ou volte ao
          início.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="pixel-label inline-flex min-h-11 items-center border-2 border-accent bg-accent px-5 text-[10px] text-bg shadow-pixel transition-transform duration-150 ease-[steps(3)] hover:-translate-y-0.5"
          >
            Tentar novamente
          </button>
          <NextLink
            href="/"
            className="pixel-label inline-flex min-h-11 items-center border-2 border-line-strong bg-bg px-5 text-[10px] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Voltar ao início
          </NextLink>
        </div>
      </div>
    </main>
  )
}
