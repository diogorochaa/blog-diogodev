'use client'

import { useCallback, useRef } from 'react'

import { ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons'
import { PostCard } from '@/components/PostCard'

import type { PostsCarouselProps } from './PostsCarousel.types'

export const PostsCarousel = ({ posts }: PostsCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBySlide = useCallback((direction: -1 | 1) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    const slide = track.querySelector<HTMLElement>('[data-carousel-slide]')

    if (!slide) {
      return
    }

    const gap = 16
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: 'smooth',
    })
  }, [])

  if (!posts.length) {
    return null
  }

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Post anterior"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent-cyan/40 bg-surface-elevated/80 text-accent-cyan transition-colors hover:border-accent-cyan hover:bg-accent-cyan/10"
          onClick={() => scrollBySlide(-1)}
        >
          <ArrowLeftIcon className="text-lg" />
        </button>
        <button
          type="button"
          aria-label="Próximo post"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent-purple/40 bg-surface-elevated/80 text-accent-purple transition-colors hover:border-accent-purple hover:bg-accent-purple/10"
          onClick={() => scrollBySlide(1)}
        >
          <ArrowRightIcon className="text-lg" />
        </button>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {posts.map((post) => (
          <article
            key={post.slug}
            data-carousel-slide
            className="w-[min(100%,20rem)] shrink-0 snap-start sm:w-[22rem]"
          >
            <PostCard post={post} variant="carousel" />
          </article>
        ))}
      </div>
    </div>
  )
}
