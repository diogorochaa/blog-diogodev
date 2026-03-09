import Link from 'next/link'

import tw from 'tailwind-styled-components'

export const LinkContainer = tw(Link)<{ $isMain: boolean }>`
  w-full
  rounded-xl
  border
  border-accent-purple/20
  bg-gradient-to-br
  from-secondary/80
  to-secondary/60
  backdrop-blur-sm
  transition-all
  duration-300
  p-4
  flex
  flex-col
  hover:border-accent-cyan/55
  hover:shadow-glow-cyan
  hover:scale-[1.02]
  animate-soft-in
  group

  ${({ $isMain }) => `
    ${$isMain && `lg:flex-row mb-6`}
  `}
`

export const ImageContainer = tw.div` 
  relative 
  h-72
  md:h-80
  w-full
`

export const Content = tw.div`
  pt-3
`

export const TagsContainer = tw.div`
  mb-3
  flex
  flex-wrap
  gap-2
`

export const Time = tw.time`
  text-gray-400
`

export const Title = tw.p`
  mt-2
  max-w-md
  text-ellipsis
  text-2xl
  font-bold
  text-white
  group-hover:text-accent-cyan
  transition-colors
  duration-300
`

export const Description = tw.p`
  mt-3
  text-gray-300
  line-clamp-3
`
