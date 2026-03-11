import type { LinkProps } from './Link.types'

export const Link = ({ children, href, className, ...rest }: LinkProps) => {
  return (
    <a
      href={href}
      className={[
        'group text-xl text-link transition-all duration-300 ease-in-out',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <span className="bg-linear-to-r from-accent-cyan to-accent-blue bg-size-[0%_2px] bg-bottom-left bg-no-repeat transition-all duration-500 ease-out group-hover:bg-size-[100%_2px]">
        {children}
      </span>
    </a>
  )
}
