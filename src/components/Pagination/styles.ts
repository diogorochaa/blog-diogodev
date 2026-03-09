'use client'

import NextLink from 'next/link'

import tw from 'tailwind-styled-components'

import { ArrowLeftIcon, ArrowRightIcon } from '../Icons'

export const Container = tw.div`
  flex
  w-full
  items-center
  justify-between
  pt-7
  animate-soft-in
`

export const PrevPageIcon = tw(ArrowLeftIcon)`
  transition-transform
  duration-300
  ease-in-out
  text-lg
  group-hover:-translate-x-1
`

export const NextPageIcon = tw(ArrowRightIcon)`
  transition-transform
  duration-300
  ease-in-out
  text-lg
  group-hover:translate-x-1
`

export const Text = tw.p``

export const Link = tw(NextLink)`
  hover:text-accent-cyan
  duration-300
  transition-all
  flex
  items-center
  gap-2
  group 
  hover:scale-105
`
