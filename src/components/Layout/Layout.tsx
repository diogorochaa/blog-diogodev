import type { LayoutProps } from './Layout.types'

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:max-w-5xl">
      {children}
    </div>
  )
}
