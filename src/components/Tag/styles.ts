import tw from 'tailwind-styled-components'

import { TagProps } from './Tag'

export const Tag = tw.p<Pick<TagProps, 'size'>>`
  rounded-2xl
  bg-link
  px-3
  py-1
  font-normal
  capitalize
  text-black
  transition-colors
  duration-300
  hover:bg-orange-200

  ${({ size }) => `
    text-${size}
  `}
`
