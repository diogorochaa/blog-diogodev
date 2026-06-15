import type { RichTextField } from '@prismicio/client'

import { createUniqueSlug } from '@/utils/slugify'

import type { PreparedRichText, TocItem } from './toc.types'

const HEADING_TYPES = new Set([
  'heading1',
  'heading2',
  'heading3',
  'heading4',
  'heading5',
  'heading6',
])

const PRISMIC_TO_TOC_LEVEL: Record<string, number> = {
  heading1: 2,
  heading2: 3,
  heading3: 4,
  heading4: 4,
  heading5: 4,
  heading6: 4,
}

const PRISMIC_TO_HTML_TAG: Record<string, string> = {
  heading1: 'h2',
  heading2: 'h3',
  heading3: 'h4',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
}

export const getHeadingHtmlTag = (prismicType: string) => {
  return PRISMIC_TO_HTML_TAG[prismicType] ?? 'h2'
}

export const getHeadingTocLevel = (prismicType: string) => {
  return PRISMIC_TO_TOC_LEVEL[prismicType] ?? 2
}

export const extractTocFromRichText = (
  field: RichTextField | null | undefined,
  usedSlugs = new Map<string, number>(),
): PreparedRichText => {
  const headingIdsInOrder: string[] = []
  const bodyTocItems: TocItem[] = []

  if (!field?.length) {
    return { headingIdsInOrder, bodyTocItems }
  }

  for (const block of field) {
    if (!HEADING_TYPES.has(block.type)) {
      continue
    }

    const text = 'text' in block ? block.text.trim() : ''

    if (!text) {
      continue
    }

    const id = createUniqueSlug(text, usedSlugs)
    const level = getHeadingTocLevel(block.type)

    headingIdsInOrder.push(id)

    if (level <= 4) {
      bodyTocItems.push({ id, text, level })
    }
  }

  return { headingIdsInOrder, bodyTocItems }
}
