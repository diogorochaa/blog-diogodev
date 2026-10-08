import NextLink from 'next/link'

import type { PaginationProps } from './Pagination.types'

const linkClassName =
  'pixel-label inline-flex min-h-11 items-center gap-2 border-2 border-line-strong bg-bg px-4 text-[10px] text-ink transition-[transform,border-color,color] duration-150 ease-[steps(3)] hover:-translate-y-0.5 hover:border-accent hover:text-accent'

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
    <nav
      aria-label="Paginação"
      className="pixel-frame mt-8 flex w-full flex-col items-stretch gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
    >
      <div className="order-2 sm:order-1 sm:min-w-44">
        {!isFirst && (
          <NextLink className={linkClassName} href={prevPage} rel="prev">
            <span aria-hidden>◀</span>
            Página anterior
          </NextLink>
        )}
      </div>

      <p className="order-1 flex flex-col items-center gap-1 text-center sm:order-2">
        <span className="font-pixel text-sm text-score">
          {currentPage} de {numbPages}
        </span>
        <span className="text-xs text-muted">
          Mostrando {startCard}-{endCard} de {totalPosts} artigos
        </span>
      </p>

      <div className="order-3 sm:min-w-44 sm:text-right">
        {!isLast && (
          <NextLink className={linkClassName} href={nextPage} rel="next">
            Próxima página
            <span aria-hidden>▶</span>
          </NextLink>
        )}
      </div>
    </nav>
  )
}
