export type BreadcrumbItem = {
  label: string
  /** Omit on the last item: it represents the current page. */
  href?: string
}

export type BreadcrumbsProps = {
  items: BreadcrumbItem[]
}
