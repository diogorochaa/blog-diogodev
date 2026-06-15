import * as prismic from '@prismicio/client'
import { type JSXMapSerializer, PrismicRichText } from '@prismicio/react'
import { createElement, type ReactNode } from 'react'

import { getHeadingHtmlTag } from '@/utils/toc/extractTocFromRichText'

import '../../../styles/rich-text.css'
import { Note } from './components'
import type { RichTextProps } from './RichText.types'

const HEADING_CLASS_NAMES: Record<string, string> = {
  h2: 'rich-text mb-6 mt-14 scroll-mt-24 pb-1 text-3xl font-bold',
  h3: 'rich-text mb-4 mt-8 scroll-mt-24 text-2xl font-bold',
  h4: 'rich-text mb-4 mt-8 scroll-mt-24 text-xl font-bold',
  h5: 'rich-text mb-4 mt-8 scroll-mt-24 text-lg font-bold',
  h6: 'rich-text mb-4 mt-8 scroll-mt-24 text-base font-bold',
}

const getRichTextLinkProps = (linkField: prismic.LinkField) => {
  const href = prismic.asLink(linkField) || '#'
  const isExternal = /^https?:\/\//.test(href)

  return {
    href,
    isExternal,
  }
}

export const createRichTextComponents = (
  headingIdsInOrder: string[],
): JSXMapSerializer => {
  let headingIndex = 0

  const nextHeadingId = () => headingIdsInOrder[headingIndex++] ?? undefined

  const renderHeading = (prismicType: string, children: ReactNode) => {
    const tag = getHeadingHtmlTag(prismicType)
    const id = nextHeadingId()

    return createElement(
      tag,
      {
        id,
        className: HEADING_CLASS_NAMES[tag],
      },
      children,
    )
  }

  return {
    heading1: ({ children }) => renderHeading('heading1', children),
    heading2: ({ children }) => renderHeading('heading2', children),
    heading3: ({ children }) => renderHeading('heading3', children),
    heading4: ({ children }) => renderHeading('heading4', children),
    heading5: ({ children }) => renderHeading('heading5', children),
    heading6: ({ children }) => renderHeading('heading6', children),
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
}

export const RichText = ({
  field = [],
  headingIdsInOrder = [],
}: RichTextProps) => {
  const components = createRichTextComponents(headingIdsInOrder)

  return <PrismicRichText field={field} components={components} />
}
