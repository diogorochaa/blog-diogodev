import Link from 'next/link'

import { PixelSprite } from '@/components/PixelSprite'

export const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Diogo FC — página inicial"
      className="group inline-flex min-h-11 min-w-0 items-center gap-3"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-line-strong bg-surface transition-transform duration-100 group-hover:-translate-y-0.5 motion-reduce:transition-none">
        <PixelSprite name="crest" scale={3} />
      </span>
      <span className="truncate font-pixel text-xs text-ink transition-colors group-hover:text-accent sm:text-sm">
        Diogo <span className="text-accent">FC</span>
      </span>
    </Link>
  )
}
