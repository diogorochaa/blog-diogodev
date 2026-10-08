'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef } from 'react'

import { PixelSprite } from '@/components/PixelSprite'
import type { LocalNavItem } from '@/models'

import { ToggleButton } from './components'
import { useMainNav } from './hooks'
import type { MainNavProps } from './MainNav.types'

export const MainNav = ({ items }: MainNavProps) => {
  const { isOpenMenu, handleToggleMenu, closeMenu } = useMainNav()
  const pathname = usePathname() || '/'
  const mobileMenuId = useId()
  const mobileNavRef = useRef<HTMLElement>(null)

  const isActive = (href: LocalNavItem['href']) => {
    if (href === '/') {
      return pathname === '/'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  useEffect(() => {
    if (!isOpenMenu) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'
    mobileNavRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpenMenu, closeMenu])

  return (
    <>
      <nav aria-label="Principal" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {items.map((item) => {
            const itemIsActive = isActive(item.href)

            return (
              <li key={item.href}>
                <Link
                  aria-current={itemIsActive ? 'page' : undefined}
                  href={item.href}
                  className={[
                    'pixel-label flex min-h-11 items-center gap-2 border-2 px-3 py-2 text-[10px] transition-colors',
                    itemIsActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-ink hover:border-line hover:text-accent',
                  ].join(' ')}
                >
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="z-50 flex shrink-0 items-center lg:hidden">
        <ToggleButton
          isOpenMenu={isOpenMenu}
          handleToggleMenu={handleToggleMenu}
          controlsId={mobileMenuId}
        />
      </div>

      {isOpenMenu ? (
        <div
          id={mobileMenuId}
          className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto bg-bg/97 px-4 py-6 sm:top-20 lg:hidden"
        >
          <nav
            ref={mobileNavRef}
            aria-label="Principal"
            className="pixel-frame mx-auto flex max-w-sm flex-col"
          >
            <p className="pixel-label border-b-2 border-line px-5 py-4 text-ink">
              Menu principal
            </p>
            <ul className="flex flex-col p-3">
              {items.map((item) => {
                const itemIsActive = isActive(item.href)

                return (
                  <li key={item.href}>
                    <Link
                      aria-current={itemIsActive ? 'page' : undefined}
                      className={[
                        'group flex min-h-12 items-center gap-3 border-2 px-3 py-2 transition-colors focus-visible:outline-none',
                        itemIsActive
                          ? 'border-accent text-accent'
                          : 'border-transparent text-ink hover:border-line focus-visible:border-accent',
                      ].join(' ')}
                      href={item.href}
                      onClick={closeMenu}
                    >
                      <span
                        className={[
                          'flex w-3 justify-center',
                          itemIsActive
                            ? 'opacity-100'
                            : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                        ].join(' ')}
                      >
                        <PixelSprite name="cursor" scale={2} />
                      </span>
                      <span className="pixel-label text-xs">{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  )
}
