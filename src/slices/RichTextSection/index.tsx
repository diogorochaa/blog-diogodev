import * as prismic from '@prismicio/client'

import { RichText } from '@/components/RichText'
import { SectionHeading } from '@/components/SectionHeading'

import type { PrismicSlice } from '../slice.types'
import { getRichTextField, getTextField } from '../slice.types'

type RichTextSectionProps = {
  slice: PrismicSlice
}

const widthClassNames = {
  narrow: 'max-w-2xl',
  default: 'max-w-4xl',
  wide: 'max-w-6xl',
} as const

export const RichTextSection = ({ slice }: RichTextSectionProps) => {
  const primary = slice.primary
  const eyebrow = getTextField(primary, 'eyebrow')
  const title = getTextField(primary, 'title')
  const content = getRichTextField(primary, 'content')
  const width = getTextField(primary, 'width', 'default')
  const widthClass =
    widthClassNames[width as keyof typeof widthClassNames] ??
    widthClassNames.default

  if (!title && !eyebrow && !prismic.asText(content)) {
    return null
  }

  return (
    <section className={`mx-auto w-full ${widthClass}`}>
      {title ? (
        <SectionHeading eyebrow={eyebrow} title={title} />
      ) : eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent-cyan">
          {eyebrow}
        </p>
      ) : null}

      <RichText field={content} />
    </section>
  )
}

export default RichTextSection
