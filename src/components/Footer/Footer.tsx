import Link from 'next/link'
import { List, ListItem } from '@/components/List'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'
import { siteConfig, socialLinkConfig } from '@/config'
import { getCurrentYear } from '@/utils'

import type { FooterProps } from './Footer.types'

export const Footer = ({ items }: FooterProps) => {
  const fullYear = getCurrentYear()

  return (
    <footer className="relative mt-14 border-t border-accent-purple/25 bg-secondary/60 pb-8 pt-10 backdrop-blur-md sm:mt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-cyan/50 to-transparent" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:justify-between md:gap-10">
        <div className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-5">
          <Logo />
          <p className="text-gradient-vivid text-lg font-bold sm:text-xl">
            {siteConfig.title}
          </p>
          <p className="text-sm text-gray-400">{siteConfig.description}</p>
        </div>

        <div className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-cyan">
            Social
          </p>
          <SocialMedia items={socialLinkConfig.mainNav} />
        </div>

        <div className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-purple">
            Links
          </p>
          <List className="flex-col gap-2">
            {items.map((item) => (
              <ListItem key={item.href}>
                <Link
                  className="text-gray-300 transition-colors hover:text-accent-cyan"
                  href={item.href}
                >
                  {item.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <div className="mt-8 flex w-full items-center justify-center px-4">
        <p className="text-center text-sm text-gray-500">
          Todos os direitos reservados © Diogo Rocha {fullYear}
        </p>
      </div>
    </footer>
  )
}
