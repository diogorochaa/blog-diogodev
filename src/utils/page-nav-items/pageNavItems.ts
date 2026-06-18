import type { LocalNavItem, PageContent } from '@/models'

type PageNavItemsParams = {
  pages: PageContent[]
  getLabel: (page: PageContent) => string
}

export const buildPageNavItems = ({
  pages,
  getLabel,
}: PageNavItemsParams): LocalNavItem[] => {
  return pages.map((page) => ({
    title: getLabel(page),
    href: `/pages/${page.uid}` as LocalNavItem['href'],
  }))
}
