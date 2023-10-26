import NextImage from 'next/image'

import tw from 'tailwind-styled-components'

export const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-5xl
`

export const Title = tw.h1`
  mb-6
  text-3xl
  font-bold
`

export const Subtitle = tw.strong`
  mb-4
  block
  text-xl
  font-bold
  leading-relaxed
  text-start
`

export const Paragraph = tw.p`
  mb-2
  text-xl
  font-normal
  leading-relaxed
  text-start
`

export const ImageContainer = tw.div`
  relative
  h-96
  rounded-full
  md:w-1/2

`

export const Image = tw(NextImage)`
  object-cover
  object-center
`
export const Card = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-5xl
  p-4
  my-4
  bg-gray-800
  rounded-xl
`
export const CardLink = tw.a`
  text-2xl
  font-bold
  text-center
  text-gray-200
  hover:text-gray-400
  transition
  duration-300
`
