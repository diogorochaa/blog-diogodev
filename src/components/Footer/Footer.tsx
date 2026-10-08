import Link from 'next/link'

import { Logo } from '@/components/Logo'
import { mainNavConfig, siteConfig } from '@/config'
import { getPlayerData } from '@/lib/player'
import type { LocalNavItem } from '@/models'
import { ContentService } from '@/services'
import { buildPageNavItems, getCurrentYear } from '@/utils'
import type { SocialLink } from '@/utils/player-identity'

import type { FooterProps } from './Footer.types'

export const FooterShell = ({
  items,
  socialLinks,
}: FooterProps & { socialLinks: SocialLink[] }) => {
  const fullYear = getCurrentYear()

  return (
    <footer className="mt-14 border-t-2 border-line bg-surface pt-10 pb-8 sm:mt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
        </div>

        <nav aria-label="Redes sociais" className="flex flex-col gap-4">
          <p className="pixel-label text-accent">Redes sociais</p>
          <ul className="flex flex-col gap-1">
            {socialLinks.map((link) => (
              <li key={link.kind}>
                <a
                  className="inline-flex min-h-9 items-center text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  href={link.href}
                  target={link.kind === 'email' ? undefined : '_blank'}
                  rel={
                    link.kind === 'email' ? undefined : 'noopener noreferrer'
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Rodapé" className="flex flex-col gap-4">
          <p className="pixel-label text-accent">Navegação</p>
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  className="inline-flex min-h-9 items-center text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-between gap-3 border-t-2 border-line px-4 pt-6 sm:flex-row sm:px-6">
        <p className="text-center text-sm text-muted">
          Todos os direitos reservados © Diogo Rocha {fullYear}
        </p>
        <p aria-hidden className="pixel-label text-[9px] text-muted">
          Jogo salvo<span className="animate-blink">_</span>
        </p>
      </div>
    </footer>
  )
}

export const Footer = async () => {
  const [footerPages, player] = await Promise.all([
    ContentService.getFooterPages(),
    getPlayerData(),
  ])
  const items: LocalNavItem[] = [
    ...mainNavConfig.mainNav,
    ...buildPageNavItems({
      pages: footerPages,
      getLabel: (page) => page.footerLabel,
    }),
  ]

  return <FooterShell items={items} socialLinks={player.identity.links} />
}
