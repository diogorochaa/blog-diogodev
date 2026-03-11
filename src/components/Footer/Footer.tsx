import Link from 'next/link'

import { siteConfig, socialLinkConfig } from '@/config'
import { getCurrentYear } from '@/utils'

import { List, ListItem } from '@/components/List'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'

import type { FooterProps } from './Footer.types'

export const Footer = ({ items }: FooterProps) => {
  const fullYear = getCurrentYear()

  return (
    <footer className="mt-14 flex flex-col border-t border-accent-purple/30 bg-secondary/50 pb-8 pt-8 backdrop-blur-sm animate-soft-in sm:mt-20 sm:pt-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-10 sm:px-6 md:flex-row md:justify-between md:gap-10">
        <div
          className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-6"
          role="contentinfo"
        >
          <Logo />
          <p className="text-lg font-bold sm:text-xl">{siteConfig.title}</p>
        </div>

        <div
          className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-6"
          role="contentinfo"
        >
          <p className="text-lg font-bold sm:text-xl">Social</p>

          <SocialMedia items={socialLinkConfig.mainNav} />
        </div>

        <div
          className="flex max-w-full flex-col gap-4 sm:max-w-xs sm:gap-6"
          role="contentinfo"
        >
          <p className="text-lg font-bold sm:text-xl">Links</p>

          <List className="flex-col gap-2">
            {items.map((item) => (
              <ListItem key={item.href}>
                <Link href={item.href}>{item.title}</Link>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <div className="mt-1 flex w-full items-center justify-center px-4">
        <p className="mb-2 max-w-[18rem] text-center text-sm text-gray-300 sm:max-w-fit sm:text-base">
          Todos os direitos reservados © Diogo Rocha {fullYear}
        </p>
      </div>
    </footer>
  )
}
