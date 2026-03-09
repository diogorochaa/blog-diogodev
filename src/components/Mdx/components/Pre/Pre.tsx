import { HTMLAttributes } from 'react'

type PreProps = HTMLAttributes<HTMLPreElement> & {
  children: React.ReactNode
  'data-language'?: string
}

export const Pre = ({ children, ...props }: PreProps) => {
  const lang = `.${props['data-language'] ?? 'shell'}`

  return (
    <div className="mt-4 rounded-lg border border-gray-700">
      <div className="flex w-full justify-between rounded-t-lg border-gray-700 bg-[#19171d] px-3 py-2">
        <p>{lang}</p>
      </div>
      <pre
        className="overflow-x-auto pb-3 pt-2 text-md bg-[#211d32]"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
