import NextImage from 'next/image'

import tw from 'tailwind-styled-components'

export const Container = tw.div`
  flex
  flex-col
  items-center
  justify-center
  gap-4
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
  md:w-1/2

`

export const Image = tw(NextImage)`
  object-cover
  object-center
  rounded-full
  border-2
  border-link
  hover:opacity-80
`
export const CardContainer = tw.div`
 grid
 grid-cols-1
 md:grid-cols-2
 lg:grid-cols-3
 grid-rows-3
 gap-4
  items-center
  justify-center
  rounded-xl
`
export const Card = tw.div`
  flex
  flex-col
  items-center
  justify-center
  gap-4
  p-4
  h-72
  w-72
  rounded-xl
  bg-secundary
  border-2
  hover:border-link
  hover:opacity-80
  cursor-pointer
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

export const ProjectsItem = tw.a`
  text-2xl
  font-bold
  text-center
  text-gray-200
  hover:text-gray-400
  transition
  duration-300
`
