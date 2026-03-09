import { LiHTMLAttributes } from 'react'

type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode
}

export const ListItem = ({ children, ...rest }: ListItemProps) => {
  const { className, ...props } = rest

  return (
    <li
      className={[
        'relative rounded-md p-2 text-md font-light transition-all duration-200 hover:scale-[1.02] hover:bg-link hover:text-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </li>
  )
}
