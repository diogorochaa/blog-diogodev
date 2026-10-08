import * as prismic from '@prismicio/client'
import { type JSXMapSerializer, PrismicRichText } from '@prismicio/react'

type CompactRichTextProps = {
  field: prismic.RichTextField
  className?: string
}

const components: JSXMapSerializer = {
  paragraph: ({ children }) => (
    <p className="leading-relaxed [&+p]:mt-3">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  hyperlink: ({ node, children }) => {
    const href = prismic.asLink(node.data) || '#'
    const isExternal = /^https?:\/\//.test(href)

    return (
      <a
        className="font-medium text-link underline underline-offset-4 hover:text-ink"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
  list: ({ children }) => (
    <ul className="mt-3 flex flex-col gap-2 pl-5 [list-style-type:square] marker:text-accent">
      {children}
    </ul>
  ),
  oList: ({ children }) => (
    <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5 marker:text-accent">
      {children}
    </ol>
  ),
  preformatted: ({ children }) => (
    <pre className="mt-3 overflow-x-auto border-2 border-line bg-bg p-4 font-mono text-sm text-ink">
      {children}
    </pre>
  ),
}

export const CompactRichText = ({
  field,
  className = 'text-base text-muted',
}: CompactRichTextProps) => {
  return (
    <div className={className}>
      <PrismicRichText field={field} components={components} />
    </div>
  )
}
