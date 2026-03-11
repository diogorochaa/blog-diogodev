import type { ListProps } from './List.types'

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
