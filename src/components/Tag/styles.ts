import tw from 'tailwind-styled-components'

import { TagProps } from './Tag'

export const Tag = tw.p<Pick<TagProps, 'size'>>`
  rounded-full
  bg-gradient-to-r
  from-accent-purple/20
  to-accent-cyan/20
  border
  border-accent-purple/30
  px-4
  py-1.5
  font-medium
  capitalize
  text-accent-cyan
  transition-all
  duration-300
  hover:border-accent-cyan/60
  hover:shadow-glow-cyan
  hover:scale-105

  ${({ size }) => `
    text-${size}
  `}
`
