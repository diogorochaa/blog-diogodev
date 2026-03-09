import tw from 'tailwind-styled-components'

export const Container = tw.div`
  flex
  flex-col
  items-center
  text-center
  gap-3
`

export const Title = tw.h1`
  font-display
  text-4xl
  md:text-5xl
  lg:text-6xl
  font-bold
  text-transparent
  bg-clip-text
  bg-gradient-to-r
  from-accent-purple
  via-accent-cyan
  to-accent-pink
  leading-tight
`

export const Subtitle = tw.p`
  text-lg
  md:text-xl
  text-gray-300
  max-w-2xl
  leading-relaxed
`
