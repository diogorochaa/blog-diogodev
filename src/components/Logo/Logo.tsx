import Link from 'next/link'

export const Logo = () => {
  return (
    <Link href="/" className="group">
      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent-purple via-accent-cyan to-accent-blue bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
        diogodev_
      </span>
    </Link>
  )
}
