import NextLink from 'next/link'

import tw from 'tailwind-styled-components'

export const Container = tw.div`
  animate-soft-in
`

export const Link = tw(NextLink)`
  flex
  items-center
  transition-all
  duration-300
  hover:text-accent-cyan
  hover:scale-105
`

export const Text = tw.p`
  ml-1
`
