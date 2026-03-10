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
            className="group pointer-events-auto absolute bottom-5 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-l from-accent-purple to-link text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-glow-cyan sm:bottom-8 sm:right-8 sm:h-12 sm:w-12"
            title="Voltar ao topo"
            aria-label="Voltar ao topo"
            onClick={() => window.scrollTo(0, 0)}
          >
            <ArrowUpIcon className="text-2xl transition-all duration-300 group-hover:animate-bounce" />
          </button>
        </div>
      )}
    </>
  )
}
