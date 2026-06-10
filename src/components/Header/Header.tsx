import { Logo } from '@/components/Logo'
import { MainNav } from '@/components/MainNav'
import { mainNavConfig } from '@/config'

export const Header = () => {
  return (
    <header className="fixed z-40 flex h-16 w-full items-center border-b border-accent-cyan/20 bg-primary/75 shadow-[0_8px_32px_rgba(5,5,10,0.65)] backdrop-blur-xl sm:h-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent-purple/70 to-transparent" />

      <div className="mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <MainNav items={mainNavConfig.mainNav} />
      </div>
    </header>
  )
}
