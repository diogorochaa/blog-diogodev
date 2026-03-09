type EmptyProps = {
  children: React.ReactNode
}

export const Empty = ({ children }: EmptyProps) => {
  return (
    <div className="flex min-h-[calc(100vh-30rem)] w-full flex-col items-center">
      <div className="mt-8 flex flex-col justify-center">{children}</div>
    </div>
  )
}
