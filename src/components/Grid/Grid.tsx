import type { GridProps } from './Grid.types'

export const Grid = ({
  children,
  className,
  cols = 1,
  sm,
  md,
  lg,
  xl,
  xxl,
  gap = 8,
}: GridProps) => {
  const small = sm ? `sm:grid-cols-${sm}` : ''
  const medium = md ? `md:grid-cols-${md}` : ''
  const large = lg ? `lg:grid-cols-${lg}` : ''
  const extraLarge = xl ? `xl:grid-cols-${xl}` : ''
  const extraExtraLarge = xxl ? `2xl:grid-cols-${xxl}` : ''
  const gapSize = gap ? `gap-${gap}` : ''

  const responsive = `${small} ${medium} ${large} ${extraLarge} ${extraExtraLarge} ${gapSize}`
  const classes = `grid grid-cols-${cols} ${responsive} w-full ${className || ''}`

  return <div className={classes.trim()}>{children}</div>
}
