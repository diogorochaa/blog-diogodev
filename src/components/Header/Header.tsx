import { mainNavConfig } from '@/config'

import { Logo } from '@/components/Logo'
import { MainNav } from '@/components/MainNav'

export const Header = () => {
  return (
    <header className="fixed z-40 flex h-16 w-full items-center border-b border-accent-purple/30 bg-secondary/80 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out animate-soft-in sm:h-20">
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-4 md:px-6">
        <Logo />

        <MainNav items={mainNavConfig.mainNav} />
      </div>
    </header>
  )
}
