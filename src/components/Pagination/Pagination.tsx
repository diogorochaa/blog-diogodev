import NextLink from 'next/link'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons'

import type { PaginationProps } from './Pagination.types'

export const Pagination = ({
  currentPage,
  numbPages,
  totalPosts,
  postsPerPage,
  prevPage,
  nextPage,
}: PaginationProps) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numbPages
  const hasPosts = totalPosts > 0
  const startCard = hasPosts ? (currentPage - 1) * postsPerPage + 1 : 0
  const endCard = hasPosts
    ? Math.min(currentPage * postsPerPage, totalPosts)
    : 0

  return (
    <div className="animate-soft-in flex w-full flex-col items-start gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="order-2 w-full sm:order-1 sm:w-auto sm:min-w-35">
        {!isFirst && (
          <NextLink
            className="group flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-accent-cyan"
            href={prevPage}
          >
            <ArrowLeftIcon className="text-lg transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
            Página anterior
          </NextLink>
        )}
      </div>

      <p className="order-1 w-full text-center sm:order-2 sm:w-auto">
        <span className="block">
          {currentPage} de {numbPages}
        </span>
        <span className="text-sm text-gray-400">
          Mostrando {startCard}-{endCard} de {totalPosts} posts
        </span>
      </p>

      <div className="order-3 w-full sm:w-auto sm:min-w-35 sm:text-right">
        {!isLast && (
          <NextLink
            className="group inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-accent-cyan"
            href={nextPage}
          >
            Próxima página
            <ArrowRightIcon className="text-lg transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </NextLink>
        )}
      </div>
    </div>
  )
}
