import tw from 'tailwind-styled-components'

export const Container = tw.a`
  group
  text-xl
  text-link
  transition-all
  duration-300
  ease-in-out
`

export const Content = tw.span`
  bg-gradient-to-r
  from-accent-cyan
  to-accent-blue
  bg-[length:0%_2px]
  bg-left-bottom
  bg-no-repeat
  transition-all
  duration-500
  ease-out
  group-hover:bg-[length:100%_2px]
`
