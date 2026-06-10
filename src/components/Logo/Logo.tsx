import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="group inline-flex items-center gap-2">
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-accent-cyan/40 bg-linear-to-br from-accent-purple/30 via-accent-cyan/20 to-accent-pink/30 text-sm font-bold text-white shadow-glow-cyan transition-transform duration-300 group-hover:scale-105"
      >
        d
      </span>
      <span className="logo-shimmer bg-linear-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-2xl font-bold text-transparent transition-transform duration-300 group-hover:scale-[1.02] md:text-3xl">
        diogodev_
      </span>
    </Link>
  )
}
