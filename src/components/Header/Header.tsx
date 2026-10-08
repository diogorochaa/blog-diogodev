import { HeaderSearch } from '@/components/HeaderSearch'
import { Logo } from '@/components/Logo'
import { MainNav } from '@/components/MainNav'
import { mainNavConfig } from '@/config'
import type { LocalNavItem, PostSearchItem } from '@/models'
import { ContentService, PostService } from '@/services'
import { buildPageNavItems } from '@/utils'

type HeaderShellProps = {
  searchIndex: PostSearchItem[]
  navItems: LocalNavItem[]
}

export const HeaderShell = ({ searchIndex, navItems }: HeaderShellProps) => {
  return (
    <header className="fixed z-40 flex h-16 w-full items-center border-b-2 border-line-strong bg-bg shadow-pixel sm:h-20">
      <a
        href="#main-content"
        className="pixel-label sr-only z-50 bg-accent px-4 py-3 text-bg focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>

      <div className="mx-auto grid h-full w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4">
        <Logo />
        <HeaderSearch items={searchIndex} />
        <MainNav items={navItems} />
      </div>
    </header>
  )
}

export const Header = async () => {
  const [searchIndex, headerPages] = await Promise.all([
    PostService.getSearchIndex(),
    ContentService.getHeaderPages(),
  ])
  const navItems: LocalNavItem[] = [
    ...mainNavConfig.mainNav,
    ...buildPageNavItems({
      pages: headerPages,
      getLabel: (page) => page.navLabel,
    }),
  ]

  return <HeaderShell searchIndex={searchIndex} navItems={navItems} />
}
