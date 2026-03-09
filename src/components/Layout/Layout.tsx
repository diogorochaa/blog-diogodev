type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 lg:max-w-5xl">{children}</div>
  )
}
