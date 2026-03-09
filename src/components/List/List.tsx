import { HTMLAttributes } from 'react'

type ListProps = HTMLAttributes<HTMLUListElement> & {
  children: React.ReactNode
}

export const List = ({ children, ...rest }: ListProps) => {
  const { className, ...props } = rest

  return (
    <ul
      className={['flex justify-between gap-3', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </ul>
  )
}
