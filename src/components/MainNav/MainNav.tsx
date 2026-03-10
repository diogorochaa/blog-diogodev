'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { List, ListItem } from '@/components/List'

import { NavItem } from '@/models'

import { ToggleButton } from './components'
import { useMainNav } from './hooks'

type MainNavProps = {
  items: NavItem[]
}

export const MainNav = ({ items }: MainNavProps) => {
  const { isOpenMenu, handleToggleMenu, closeMenu } = useMainNav()
  const pathname = usePathname() || '/'

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      <nav className="hidden items-center justify-between lg:flex animate-soft-in">
        <List>
          {items.map((item) => {
            const itemIsActive = isActive(item.href)

            return (
              <ListItem
                className={
                  itemIsActive
                    ? 'bg-link text-primary font-medium scale-[1.02]'
                    : undefined
                }
                key={item.title}
              >
                <Link
                  aria-current={itemIsActive ? 'page' : undefined}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </ListItem>
            )
          })}
        </List>
      </nav>

      <div className="z-50 flex transition-colors duration-300 hover:text-accent-cyan lg:hidden">
        <ToggleButton
          isOpenMenu={isOpenMenu}
          handleToggleMenu={handleToggleMenu}
        />
      </div>

      {isOpenMenu && (
        <div className="fixed inset-x-0 top-0 z-30 min-h-screen w-full overflow-y-auto bg-secondary/95 pt-16 backdrop-blur-lg sm:pt-20">
          <nav className="mx-auto flex w-[92%] max-w-sm items-center justify-center rounded-2xl border border-gray-600 bg-secondary px-1 py-3 shadow-2xl sm:w-[84%]">
            <List className="w-full flex-col px-3">
              {items.map((item) => {
                const itemIsActive = isActive(item.href)

                return (
                  <ListItem
                    className={[
                      'border-b border-gray-600 py-3 first:pt-1 last:border-b-0',
                      itemIsActive ? 'bg-link text-primary font-medium' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={item.title}
                  >
                    <Link
                      aria-current={itemIsActive ? 'page' : undefined}
                      className="block w-full"
                      href={item.href}
                      onClick={closeMenu}
                    >
                      {item.title}
                    </Link>
                  </ListItem>
                )
              })}
            </List>
          </nav>
        </div>
      )}
    </>
  )
}
