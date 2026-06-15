import { HeaderSearch } from '@/components/HeaderSearch'
import { Logo } from '@/components/Logo'
import { MainNav } from '@/components/MainNav'
import { mainNavConfig } from '@/config'
import type { PostSearchItem } from '@/models'
import { PostService } from '@/services'

type HeaderShellProps = {
  searchIndex: PostSearchItem[]
}

export const HeaderShell = ({ searchIndex }: HeaderShellProps) => {
  return (
    <header className="fixed z-40 flex h-16 w-full items-center border-b border-accent-cyan/20 bg-primary/75 shadow-[0_8px_32px_rgba(5,5,10,0.65)] backdrop-blur-xl sm:h-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-purple/70 to-transparent" />

      <div className="mx-auto grid h-full w-full max-w-5xl grid-cols-[auto_auto_auto] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-4">
        <Logo />
        <HeaderSearch items={searchIndex} />
        <MainNav items={mainNavConfig.mainNav} />
      </div>
    </header>
  )
}

export const Header = async () => {
  const searchIndex = await PostService.getSearchIndex()

  return <HeaderShell searchIndex={searchIndex} />
}
