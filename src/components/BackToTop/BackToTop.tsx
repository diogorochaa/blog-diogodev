'use client'

import { ArrowUpIcon } from '@/components/Icons'

import { useBackToTop } from './useBackToTop'

export const BackToTop = () => {
  const { show } = useBackToTop()

  return (
    <>
      {/* The check needs for all, because if not, it will launch an hydration error */}
      {show && (
        <div className="pointer-events-none fixed inset-0 z-50 h-full min-h-screen w-full">
          <button
            type="button"
            className="pointer-events-auto absolute right-4 bottom-5 flex h-11 w-11 items-center justify-center border-2 border-accent bg-bg text-accent shadow-pixel transition-colors hover:bg-accent hover:text-bg sm:right-8 sm:bottom-8 sm:h-12 sm:w-12"
            title="Voltar ao topo"
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowUpIcon className="text-2xl" />
          </button>
        </div>
      )}
    </>
  )
}
