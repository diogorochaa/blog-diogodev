import NextLink from 'next/link'

import { ArrowLeftIcon } from '@/components/Icons'

export const BackButton = () => {
  return (
    <NextLink
      className="group flex cursor-pointer items-center gap-1 text-gray-400 transition-colors duration-300 hover:text-accent-cyan"
      href="/"
    >
      <div className="flex h-8 items-center justify-center rounded-full group-hover:text-gray-100">
        <ArrowLeftIcon
          className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1"
          size={20}
        />
      </div>

      <p className="duration-300 ease-in-out group-hover:text-gray-100">
        Voltar à listagem
      </p>
    </NextLink>
  )
}
