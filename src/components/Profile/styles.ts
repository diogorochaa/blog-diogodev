import NextImage from 'next/image'

import tw from 'tailwind-styled-components'

export const Title = tw.h1`
  my-3 
  text-4xl 
  font-bold
  text-transparent
  bg-clip-text
  bg-gradient-to-l from-zinc-100 via-orange-400 to-link
`

export const Subtitle = tw.p`
  text-md
`

export const Image = tw(NextImage)`
  rounded-full
`
