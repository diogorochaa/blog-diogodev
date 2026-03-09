import tw from 'tailwind-styled-components'

import { ArrowUpIcon } from '@/components/Icons'

export const Container = tw.div`
  pointer-events-none
  fixed
  inset-0
  z-50
  h-full
  min-h-screen
  w-full
`

export const Button = tw.button`
  group  
  pointer-events-auto
  absolute
  bottom-8
  right-8
  flex
  items-center
  justify-center
  h-12
  w-12
  rounded-full
  bg-gradient-to-l from-accent-purple to-link
  text-white
  transition-all
  duration-300
  ease-in-out
  hover:shadow-glow-cyan
  hover:scale-105
`

export const Icon = tw(ArrowUpIcon)`
  text-2xl
  transition-all
  duration-300
  group-hover:animate-bounce
`
