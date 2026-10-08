export type RetroMenuItem = {
  label: string
  hint: string
  href: string
}

export type RetroMenuProps = {
  items: RetroMenuItem[]
  ariaLabel: string
  className?: string
}
