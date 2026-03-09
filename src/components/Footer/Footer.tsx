import Link from 'next/link'

import { siteConfig, socialLinkConfig } from '@/config'

import { List, ListItem } from '@/components/List'
import { Logo } from '@/components/Logo'
import { SocialMedia } from '@/components/SocialMedia'

import { NavItem } from '@/models'

type FooterProps = {
  items: NavItem[]
}

export const Footer = ({ items }: FooterProps) => {
  const fullYear = new Date().getFullYear()

  return (
    <footer className="mt-20 flex flex-col border-t border-accent-purple/30 bg-secondary/50 pb-8 pt-10 backdrop-blur-sm animate-soft-in">
      <div className="mx-auto flex gap-10 justify-between pb-10 md:max-w-4xl">
        <div
          className="flex max-w-32 flex-col gap-6 sm:max-w-xs"
          role="contentinfo"
        >
          <Logo />
          <p className="text-xl font-bold">{siteConfig.title}</p>
        </div>

        <div
          className="flex max-w-32 flex-col gap-6 sm:max-w-xs"
          role="contentinfo"
        >
          <p className="text-xl font-bold">Social</p>

          <SocialMedia items={socialLinkConfig.mainNav} />
        </div>

        <div
          className="flex max-w-32 flex-col gap-6 sm:max-w-xs"
          role="contentinfo"
        >
          <p className="text-xl font-bold">Links</p>

          <List className="flex-col">
            {items.map((item) => (
              <ListItem key={item.href}>
                <Link target="_blank" href={item.href}>
                  {item.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </div>

      <div className="mt-3 flex w-full items-center justify-center">
        <p className="mb-2 max-w-[18rem] text-center text-gray-300 sm:max-w-fit">
          Todos os direitos reservados © Diogo Rocha {fullYear}
        </p>
      </div>
    </footer>
  )
}
