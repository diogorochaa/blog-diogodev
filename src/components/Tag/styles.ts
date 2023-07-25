import tw from 'tailwind-styled-components'

import { TagProps } from './Tag'

export const Tag = tw.p<Pick<TagProps, 'size'>>`
  rounded-2xl
  bg-violet-900
  px-3
  py-1
  font-normal
  capitalize
  text-gray-100
  transition-colors
  duration-300
  hover:bg-violet-600

  ${({ size }) => `
    text-${size}
  `}
`
