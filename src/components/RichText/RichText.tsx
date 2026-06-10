import * as prismic from '@prismicio/client'
import { type JSXMapSerializer, PrismicRichText } from '@prismicio/react'

import '../../../styles/rich-text.css'
import { Note } from './components'
import type { RichTextProps } from './RichText.types'

const getRichTextLinkProps = (linkField: prismic.LinkField) => {
  const href = prismic.asLink(linkField) || '#'
  const isExternal = /^https?:\/\//.test(href)

  return {
    href,
    isExternal,
  }
}

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <h1 className="rich-text mt-12 scroll-m-20 text-4xl font-bold">
      {children}
    </h1>
  ),
  heading2: ({ children }) => (
    <h2 className="rich-text mb-6 mt-14 scroll-m-20 pb-1 text-3xl font-bold">
      {children}
    </h2>
  ),
  heading3: ({ children }) => (
    <h3 className="rich-text mb-4 mt-8 scroll-m-20 text-2xl font-bold">
      {children}
    </h3>
  ),
  heading4: ({ children }) => (
    <h4 className="rich-text mb-4 mt-8 scroll-m-20 text-xl font-bold">
      {children}
    </h4>
  ),
  heading5: ({ children }) => (
    <h5 className="rich-text mb-4 mt-8 scroll-m-20 text-lg font-bold">
      {children}
    </h5>
  ),
  heading6: ({ children }) => (
    <h6 className="rich-text mb-4 mt-8 scroll-m-20 text-base font-bold">
      {children}
    </h6>
  ),
  paragraph: ({ children }) => (
    <p className="rich-text mb-4 text-xl leading-7 text-slate-300">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="rich-text font-semibold text-slate-50">
      {children}
    </strong>
  ),
  em: ({ children }) => <em className="rich-text italic">{children}</em>,
  hyperlink: ({ node, children }) => {
    const { href, isExternal } = getRichTextLinkProps(node.data)

    return (
      <a
        className="rich-text font-medium text-link underline underline-offset-4"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
  list: ({ children }) => (
    <ul className="rich-text mb-4 ml-8 list-disc text-xl leading-7 text-slate-300">
      {children}
    </ul>
  ),
  oList: ({ children }) => (
    <ol className="rich-text mb-4 ml-8 list-decimal text-xl leading-7 text-slate-300">
      {children}
    </ol>
  ),
  listItem: ({ children }) => <li className="rich-text mb-2">{children}</li>,
  oListItem: ({ children }) => <li className="rich-text mb-2">{children}</li>,
  preformatted: ({ children }) => (
    <pre className="rich-text mb-4 mt-6 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 p-4 font-mono text-sm text-slate-200">
      {children}
    </pre>
  ),
  label: ({ node, children }) => {
    if (node.data.label === 'note') {
      return <Note>{children}</Note>
    }

    if (node.data.label === 'codespan') {
      return (
        <code className="rich-text text-md relative rounded bg-gray-700 px-[0.4rem] py-[0.1rem] font-mono leading-tight text-gray-50">
          {children}
        </code>
      )
    }

    return <span>{children}</span>
  },
}

export const RichText = ({ field = [] }: RichTextProps) => {
  return <PrismicRichText field={field} components={components} />
}
