import tw from 'tailwind-styled-components'

export const Container = tw.header`
  fixed
  z-40
  flex
  h-20
  w-full
  items-center
  backdrop-blur-md
  bg-secondary/80
  transition-all
  duration-300
  ease-in-out
  border-b
  border-accent-purple/30
  shadow-lg
  animate-soft-in
`

export const Content = tw.div`
  flex
  h-full
  w-full
  items-center
  justify-between
  px-4
`

export const Nav = tw.nav`
  flex
  items-center
  justify-between
`

export const List = tw.ul`
  flex
  gap-4
`

export const ListItem = tw.li`
  text-md
  font-medium
  transition-colors
  duration-300
  ease-in-out
  hover:text-accent-cyan
`
