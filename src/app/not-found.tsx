import NextLink from 'next/link'

import { Empty } from '@/components/Empty'

export default function NotFound() {
  return (
    <Empty>
      <h1 className="text-center text-4xl font-extrabold">
        Página não encontrada
      </h1>

      <p className="mt-4 text-center text-xl text-gray-400">
        O endereço pode estar incorreto ou a página foi removida.
      </p>

      <NextLink
        href="/"
        className="mt-8 inline-flex rounded-lg border border-accent-cyan/40 bg-secondary/60 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-accent-cyan hover:text-accent-cyan"
      >
        Voltar ao início
      </NextLink>
    </Empty>
  )
}
