import type { Route } from 'next'

export type NavItem = {
  title: string
  href: string
  icon?: React.ReactNode
}

export type LocalNavItem = Omit<NavItem, 'href'> & {
  href: Route
}

export type LocalMainNavType = {
  mainNav: LocalNavItem[]
}
