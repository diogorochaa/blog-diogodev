import NextLink from 'next/link'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons'

type PaginationProps = {
  currentPage: number
  numbPages: number
  prevPage: string
  nextPage: string
}

export const Pagination = ({
  currentPage,
  numbPages,
  prevPage,
  nextPage,
}: PaginationProps) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numbPages

  return (
    <div className="flex w-full items-center justify-between pt-7 animate-soft-in">
      {!isFirst && (
        <NextLink
          className="group flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-accent-cyan"
          href={prevPage}
        >
          <ArrowLeftIcon className="text-lg transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
          Página anterior
        </NextLink>
      )}

      <p>
        {currentPage} de {numbPages}
      </p>

      {!isLast && (
        <NextLink
          className="group flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-accent-cyan"
          href={nextPage}
        >
          Próxima página
          <ArrowRightIcon className="text-lg transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
        </NextLink>
      )}
    </div>
  )
}
